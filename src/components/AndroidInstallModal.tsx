import React, { useState, useEffect } from 'react';
import {
  X,
  Smartphone,
  Download,
  CheckCircle2,
  Sparkles,
  FolderArchive,
  HelpCircle,
  Copy,
  ExternalLink,
  QrCode,
} from 'lucide-react';
import QRCode from 'qrcode';
import { usePWAInstall } from '../usePWAInstall';
import { downloadAndroidProjectBundle } from '../utils/androidPackageGenerator';
import { AbcAppIcon } from './AbcAppIcon';

interface AndroidInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidInstallModal: React.FC<AndroidInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  const installUrl =
    typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null'
      ? window.location.origin
      : 'https://ais-dev-c2uqa7ymyykapn3ifymfzr-11100399043.asia-northeast1.run.app';

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(installUrl, {
        width: 180,
        margin: 1,
        color: {
          dark: '#1E1B4B',
          light: '#FFFFFF',
        },
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error('QR code generation failed:', err));
    }
  }, [isOpen, installUrl]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(installUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDirectInstall = async () => {
    if (isInstallable) {
      await install();
    }
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloadingZip(true);
      await downloadAndroidProjectBundle();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDownloadingZip(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border-4 border-indigo-400 p-5 sm:p-6 text-gray-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition active:scale-90"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with 3D App Icon */}
        <div className="text-center pt-2 pb-4 border-b border-gray-100">
          <div className="relative inline-block mb-3">
            <AbcAppIcon className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl shadow-xl" />
            <div className="absolute -top-1 -right-1 bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
              ANDROID
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 tracking-tight">
            ABC Fun Learning
          </h2>
          <p className="text-sm text-indigo-600 font-bold mt-0.5">
            Android Installation & APK Center
          </p>
        </div>

        {/* DIRECT APP INSTALL LINK BOX */}
        <div className="mt-4 p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-black text-indigo-900 uppercase tracking-wide flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
              App Install Link:
            </span>
            {copied && (
              <span className="text-xs font-black text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Copied!
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={installUrl}
              className="flex-1 text-xs font-mono bg-white px-3 py-2 rounded-xl border border-indigo-200 text-indigo-950 select-all"
            />
            <button
              onClick={handleCopyLink}
              className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* QR Code Scan & Open for Mobile */}
          {qrCodeDataUrl && (
            <div className="mt-3 pt-3 border-t border-indigo-100 flex items-center justify-center gap-4">
              <div className="bg-white p-1.5 rounded-xl border border-indigo-200 shadow-xs">
                <img src={qrCodeDataUrl} alt="Install QR Code" className="w-24 h-24 rounded-lg" />
              </div>
              <div className="text-left max-w-[210px]">
                <span className="text-xs font-black text-indigo-950 block">
                  Scan with Android Camera
                </span>
                <span className="text-[11px] text-indigo-800 leading-tight block mt-0.5">
                  Point your phone's camera or Google Lens to immediately open and install on your phone!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-4 space-y-3">
          {/* Option 1: Direct 1-Click Install to Phone */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500 text-white shadow-md">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-emerald-950">
                    Option 1: 1-Click Phone Installation
                  </h3>
                  <span className="bg-emerald-200 text-emerald-900 text-[11px] font-black px-2 py-0.5 rounded-md">
                    RECOMMENDED
                  </span>
                </div>
                <p className="text-xs text-emerald-800 mt-1">
                  Installs directly to your Android Home Screen & App Drawer with the custom 3D ABC icon and offline mode.
                </p>

                {isInstalled ? (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-200 text-emerald-900 text-xs font-black">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    App is already installed on this device!
                  </div>
                ) : (
                  <button
                    onClick={handleDirectInstall}
                    className="mt-3 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-98 text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>{isInstallable ? 'Install Now on Android Phone' : 'Install via Browser Menu (Add to Home)'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Option 2: Download Complete Android Source & APK Builder */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md">
                <FolderArchive className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-base text-indigo-950">
                  Option 2: Download Android Project & APK Bundle
                </h3>
                <p className="text-xs text-indigo-800 mt-1">
                  Complete ready-to-build Android Studio project with <code className="bg-indigo-100 px-1 py-0.5 rounded font-mono">AndroidManifest.xml</code>, launcher icons, Kotlin code, Gradle scripts, and 1-click build script.
                </p>

                <button
                  onClick={handleDownloadZip}
                  disabled={isDownloadingZip}
                  className="mt-3 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-98 text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isDownloadingZip
                      ? 'Generating Project ZIP...'
                      : downloadSuccess
                      ? '✓ Project Downloaded!'
                      : 'Download Android Source Package (.zip)'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* NATIVE ANDROID APK vs CHROME SHORTCUT NOTICE */}
        <div className="mt-4 p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-300">
          <div className="flex items-center gap-2 text-indigo-950 font-black text-sm mb-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>How to Remove the Chrome Badge:</span>
          </div>
          <p className="text-xs text-indigo-900 leading-relaxed">
            • <strong>Chrome Browser Shortcuts</strong> always add a small Chrome logo badge at the bottom corner by Android system design.<br />
            • To get a <strong>100% Native Android App with NO Chrome badge</strong> and ONLY the colorful 3D ABC launcher icon, download the complete Android Package below and install the native <strong>.APK</strong>!
          </p>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm mb-2">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>How to install on your Android device:</span>
          </div>
          <ol className="text-xs text-amber-950 space-y-1.5 list-decimal list-inside pl-1 font-medium">
            <li><strong>Method 1 (Native APK):</strong> Click Option 2 below to download the Android source package, then run <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">./gradlew assembleRelease</code> to generate the signed <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">app-release.apk</code> with custom mipmap icons.</li>
            <li><strong>Method 2 (1-Click Install):</strong> In Chrome on your phone, click <strong>"Install app"</strong> (NOT "Create shortcut"). Android will install the WebAPK with the full-color ABC logo.</li>
          </ol>
        </div>

        {/* APK Build Instructions */}
        <div className="mt-4 p-4 rounded-2xl bg-gray-50 border border-gray-200">
          <h4 className="font-extrabold text-xs text-gray-700 uppercase tracking-wide mb-1.5">
            How to build standalone .APK file:
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed font-mono bg-white p-2.5 rounded-xl border border-gray-200">
            # 1. Unzip the downloaded Android package<br />
            # 2. In terminal run: ./gradlew assembleRelease<br />
            # 3. APK is saved at: app/build/outputs/apk/release/app-release.apk
          </p>
        </div>

        {/* Bottom Close */}
        <button
          onClick={onClose}
          className="mt-5 w-full py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition"
        >
          Back to Game
        </button>
      </div>
    </div>
  );
};
