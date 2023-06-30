// stripe.js
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51MoidVHNNef0nI46xUh9zDxSkM1boBYi4dsk34pwiUYQXCVNOlgvJW4SSi6I9e6rKsfuhVHXjPZ6sH9QhunJ9jG500OJ5LxZkQ', {
	apiVersion: '2022-11-15',
});

export default stripe;
