// src\classes\Session.jsx

export class Session {
    constructor(creator, type) {
        this.creator = creator; // creator method (e.g. 'system' or 'user')
        this.type = type; // e.g. 'interview'
        this.messages = []; // Store chat messages
        this.metadata = {}; // For any additional data
    }
}