#!/usr/bin/env bash
# CI'da secret olmadan üretilen AAB'yi yükleme anahtarıyla yeniden imzalar.
# Kullanım: scripts/aab-imzala.sh <girdi.aab> <anahtar.jks> <anahtar-adi> <cikti.aab>
# Şifre KD_ANAHTAR_SIFRE ortam değişkeninden okunur.
set -euo pipefail
girdi=$1; anahtar=$2; ad=$3; cikti=$4
: "${KD_ANAHTAR_SIFRE:?KD_ANAHTAR_SIFRE gerekli}"
cp "$girdi" "$cikti"
# Hata ayıklama imzasını kaldır
zip -q -d "$cikti" 'META-INF/*.SF' 'META-INF/*.RSA' 'META-INF/*.DSA' 'META-INF/*.EC' 'META-INF/MANIFEST.MF' || true
jarsigner -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore "$anahtar" -storepass:env KD_ANAHTAR_SIFRE "$cikti" "$ad" >/dev/null
jarsigner -verify "$cikti" | tail -1
