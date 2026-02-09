<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <style>
        @page { margin: 1cm; }
        body { 
            font-family: 'Helvetica', 'Arial', sans-serif; 
            color: #333; 
            line-height: 1.5;
            margin: 0;
        }
        /* En-tête avec Logo */
        .header-table {
            width: 100%;
            border-bottom: 2px solid #A66D3B;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo { width: 120px; }
        .company-info { text-align: right; color: #666; font-size: 12px; }
        
        /* Titre du document */
        .doc-title {
            text-align: center;
            text-transform: uppercase;
            color: #A66D3B;
            letter-spacing: 2px;
            margin-bottom: 30px;
        }

        /* Sections */
        .section-title {
            background-color: #F4EFEA;
            color: #8B5A2B;
            padding: 8px 15px;
            font-weight: bold;
            border-left: 4px solid #A66D3B;
            margin-bottom: 15px;
            text-transform: uppercase;
            font-size: 14px;
        }
        
        .info-grid { width: 100%; margin-bottom: 25px; }
        .info-label { font-weight: bold; color: #555; width: 30%; padding: 5px 0; }
        .info-value { color: #222; padding: 5px 0; }

        .description-box {
            border: 1px solid #E5D6C8;
            padding: 15px;
            background-color: #fcfcfc;
            min-height: 100px;
        }

        /* Pied de page */
        .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: 10px;
            color: #999;
            border-top: 1px solid #eee;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <table class="header-table">
        <tr>
            <td>
                {{-- Remplacement du logo par Base64 pour éviter les erreurs de chargement --}}
                @php
                    $path = public_path('images/logo.png');
                    $type = pathinfo($path, PATHINFO_EXTENSION);
                    $data_img = file_get_contents($path);
                    $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data_img);
                @endphp
                <img src="{{ $base64 }}" class="logo">
            </td>
            <td class="company-info">
                <strong>VOTRE SOCIÉTÉ</strong><br>
                123 Rue de l'Artisanat, Casablanca<br>
                Contact: +212 6 XX XX XX XX<br>
                Email: contact@votresite.com
            </td>
        </tr>
    </table>

    <h1 class="doc-title">Demande de Devis #{{ date('Y') }}-{{ rand(1000, 9999) }}</h1>

    <div class="section-title">Informations Client</div>
    <table class="info-grid">
        <tr>
            <td class="info-label">Nom Complet :</td>
            <td class="info-value">{{ $data['full_name'] }}</td>
        </tr>
        <tr>
            <td class="info-label">Téléphone :</td>
            <td class="info-value">{{ $data['phone'] }}</td>
        </tr>
        <tr>
            <td class="info-label">Email :</td>
            <td class="info-value">{{ $data['email'] ?? 'Non précisé' }}</td>
        </tr>
        <tr>
            <td class="info-label">Ville :</td>
            <td class="info-value">{{ $data['city'] ?? '-' }}</td>
        </tr>
    </table>

    <div class="section-title">Détails du Projet</div>
    <table class="info-grid">
        <tr>
            <td class="info-label">Type de projet :</td>
            <td class="info-value"><strong>{{ ucfirst($data['project_type']) }}</strong></td>
        </tr>
        @if(isset($data['budget']))
        <tr>
            <td class="info-label">Budget estimé :</td>
            <td class="info-value">{{ $data['budget'] }} MAD</td>
        </tr>
        @endif
    </table>

    <div class="section-title">Description des travaux</div>
    <div class="description-box">
        {{ $data['description'] }}
    </div>

    <div class="footer">
        Document généré automatiquement le {{ date('d/m/Y à H:i') }}<br>
        Merci de votre confiance. Nous reviendrons vers vous avec une proposition détaillée sous 24 heures.
    </div>
</body>
</html>