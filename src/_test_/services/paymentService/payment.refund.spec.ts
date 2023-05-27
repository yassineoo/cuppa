import stripe from '../../../services/service-paiement/paymentConfig';
import PaymentService from '../../../services/service-paiement/payment';
import models from '../../../models/sequelize';

const Paiement = models.paiement;

describe('refundPayment', () => {
	const mockPaiement = {
		paymentIntentId: 'pi_123',
	};
	const transfersMock = {
		data : [
			{id : 1}
		]
	};


	it('should call Stripe API to process refund', async () => {
		spyOn(Paiement, 'findByPk').and.returnValue(mockPaiement);

		// Call the refundPayment method with mock parameters
		const paymentId = 123;
		const amount = 100;
		const reason = 'test';
		const paymentSpy = spyOn(stripe.refunds, 'create').and.returnValue(Promise.resolve() as any );
		const transfersSpy = spyOn(stripe.transfers, 'list').and.returnValue(Promise.resolve(transfersMock) as any);
		const reversalSpy = spyOn(stripe.transfers, 'createReversal').and.returnValue(Promise.resolve() as any);
		const result = await PaymentService.refundPayment(paymentId, amount, reason);

		// Assert that the Stripe refunds.create method was called with the correct parameters
		expect(paymentSpy).toHaveBeenCalledWith({
			payment_intent: mockPaiement.paymentIntentId,
			amount,
			reason
		} as any);

		// Assert that the Stripe transfers.list method was called with the correct parameter
		expect(transfersSpy).toHaveBeenCalledWith({ transfer_group: `group_${mockPaiement.paymentIntentId}` } as any);

		// Wait for the transfers promise to resolve and then access the data property
		const transfers = await transfersSpy.calls.mostRecent().returnValue;
		expect(transfers.data[0]).toBeDefined();

		// Assert that the Stripe transfers.createReversal method was called with the correct parameters
		expect(reversalSpy).toHaveBeenCalledWith(transfers.data[0].id, {
			description: `Reversal for transfer (${reason})`,
			refund_application_fee: true,
		} as any);

		// Assert that the method returns the correct result
	});

	it('should throw error if Stripe API call fails', async () => {
		// Set up Stripe refunds.create to throw an error
		spyOn(stripe.refunds, 'create').and.throwError('API call failed');

		// Call the refundPayment method with mock parameters
		const paymentId = 123;
		const amount = 100;
		const reason = 'test';
		// Assert that the method throws an error
		await expectAsync(PaymentService.refundPayment(paymentId, amount, reason)).toBeRejectedWithError('Error processing refund');
	});
});
