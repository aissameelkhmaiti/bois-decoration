<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactReceived extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public $contact) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nouveau message : ' . $this->contact->subject,
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.contact-received',
        );
    }
}