// Mock data for demo purposes
const movies = [
    { id: 1, title: 'Movie A', genre: 'Action', showtimes: ['10:00 AM', '1:00 PM', '4:00 PM'] },
    { id: 2, title: 'Movie B', genre: 'Comedy', showtimes: ['11:00 AM', '2:00 PM', '5:00 PM'] }
];

const seats = {
    screen1: [
        { id: 1, number: 'A1', status: 'available' },
        { id: 2, number: 'A2', status: 'booked' },
        // More seats...
    ],
    screen2: [
        { id: 1, number: 'B1', status: 'available' },
        // More seats...
    ]
};

new Vue({
    el: '#app',
    data: {
        isLoggedIn: false,
        loginForm: {
            email: '',
            password: ''
        },
        currentUser: null,
        selectedMovie: null,
        selectedSeats: [],
        numTickets: 0
    },
    methods: {
        login() {
            // Simulated login logic; replace with actual authentication
            if (this.loginForm.email === 'user@example.com' && this.loginForm.password === 'password') {
                this.isLoggedIn = true;
                this.currentUser = { name: 'John Doe', email: this.loginForm.email };
                this.loginForm.email = '';
                this.loginForm.password = '';
            } else {
                alert('Invalid credentials');
            }
        },
        selectMovie(movie) {
            this.selectedMovie = movie;
        },
        selectSeat(seat) {
            // Logic to handle seat selection
            if (seat.status === 'available') {
                // Toggle seat selection
                seat.status = 'selected';
                this.selectedSeats.push(seat);
            } else if (seat.status === 'selected') {
                seat.status = 'available';
                this.selectedSeats = this.selectedSeats.filter(s => s.id !== seat.id);
            }
        },
        reserveTickets() {
            // Logic for ticket reservation and payment integration
            // Implement payment gateway integration here
            // After successful payment, show booking confirmation
            alert('Tickets reserved! Confirmation will be sent to your email.');
        }
    }
});
// server.js (Backend)

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock data for demo
let users = [
    { id: 1, name: 'John Doe', email: 'user@example.com', password: 'password' }
];

// Routes
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ success: true, message: 'Login successful', user });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Implement other routes for movie selection, seat management, booking, etc.

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});