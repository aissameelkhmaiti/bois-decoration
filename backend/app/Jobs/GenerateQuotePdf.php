<?php

namespace App\Jobs;

use App\Models\Quote;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class GenerateQuotePdf implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $quote;

    public function __construct(Quote $quote)
    {
        $this->quote = $quote;
    }

    public function handle()
    {
        // 1. Charger la vue avec les données du modèle Quote
        $pdf = Pdf::loadView('pdf.quote', ['data' => $this->quote->toArray()]);

        // 2. Définir le nom et le chemin du fichier
        $filename = 'quotes/devis_' . $this->quote->id . '_' . time() . '.pdf';

        // 3. Stocker le PDF sur le disque public
        Storage::disk('public')->put($filename, $pdf->output());

        // 4. Mettre à jour la ligne en BDD avec le chemin du PDF
        $this->quote->update([
            'pdf_path' => $filename
        ]);
    }
}