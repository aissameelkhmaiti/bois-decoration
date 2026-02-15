<?php

namespace App\Observers;

use App\Models\Contact;
use App\Mail\ContactReceived;
use Illuminate\Support\Facades\Mail;

class ContactObserver
{
    /**
     * Se déclenche juste après qu'un contact soit enregistré en BDD
     */
    public function created(Contact $contact): void
    {
        // Utilisation du Helper
        notifyApp(
            'Nouveau Contact', 
            "Un message de {$contact->name} vient d'arriver.", 
            'contact'
        );

        // // Envoi de l'email
        // Mail::to('aissameelkhmaiti@gmail.com')->send(new ContactReceived($contact));
    }
}