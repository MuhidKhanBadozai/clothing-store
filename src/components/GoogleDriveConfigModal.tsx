import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  HardDrive, 
  Check, 
  Copy, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck,
  HelpCircle,
  FolderOpen
} from 'lucide-react';
import { googleDriveService, DEFAULT_APPS_SCRIPT_CODE } from '../services/googleDriveService';

interface GoogleDriveConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: () => void;
}

export const GoogleDriveConfigModal: React.FC<GoogleDriveConfigModalProps> = ({
  isOpen,
  onClose,
  onSaved,
}) => {
  const currentConfig = googleDriveService.getConfig();
  const [scriptUrl, setScriptUrl] = useState(currentConfig.scriptUrl);
  const [folderId, setFolderId] = useState(currentConfig.folderId);
  const [copiedScript, setCopiedScript] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success?: boolean; message?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'settings' | 'guide' | 'code'>('settings');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(DEFAULT_APPS_SCRIPT_CODE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleTestConnection = async () => {
    if (!scriptUrl.trim()) {
      setTestResult({ success: false, message: 'Please enter your Google Apps Script Web App URL first.' });
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      const res = await googleDriveService.testConnection(scriptUrl, folderId);
      setTestResult(res);
    } catch (e: any) {
      setTestResult({ success: false, message: e.message || 'Connection test failed.' });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    googleDriveService.saveConfig({
      scriptUrl: scriptUrl.trim(),
      folderId: folderId.trim(),
      autoDirectUrl: true,
    });
    if (onSaved) onSaved();
    onClose();
  };

  const isConfigured = Boolean(currentConfig.scriptUrl && currentConfig.scriptUrl.trim());

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-xs shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-neutral-950 text-white flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xs bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <HardDrive className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm uppercase tracking-wider">
                      Google Drive Cloud Storage Bridge
                    </h3>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isConfigured ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'}`}>
                      {isConfigured ? 'CONNECTED' : 'SETUP REQUIRED'}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Store infinite high-res product photos on your personal Google Drive for 100% free
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-white p-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 text-xs font-semibold px-4 pt-2 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`pb-2 px-3 border-b-2 transition-colors ${
                  activeTab === 'settings'
                    ? 'border-neutral-950 dark:border-white text-neutral-950 dark:text-white'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Settings &amp; URL
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('guide')}
                className={`pb-2 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'guide'
                    ? 'border-neutral-950 dark:border-white text-neutral-950 dark:text-white'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>3-Step Setup Guide (1 Min)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('code')}
                className={`pb-2 px-3 border-b-2 transition-colors ${
                  activeTab === 'code'
                    ? 'border-neutral-950 dark:border-white text-neutral-950 dark:text-white'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Apps Script Code
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs">
              {activeTab === 'settings' && (
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xs flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-emerald-900 dark:text-emerald-200 text-[11px] leading-relaxed">
                      <strong>How it works:</strong> When you drag &amp; drop product pictures in the Admin Panel, they upload straight to your Google Drive folder. Direct high-speed CDN links (<code className="bg-emerald-100 dark:bg-emerald-900 px-1 py-0.5 rounded text-[10px]">https://lh3.googleusercontent.com/d/FILE_ID</code>) are automatically saved to Firestore.
                    </p>
                  </div>

                  <div>
                    <label className="block font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                      Google Apps Script Web App URL *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                      value={scriptUrl}
                      onChange={(e) => setScriptUrl(e.target.value)}
                      className="w-full px-3 py-2 font-mono text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white focus:outline-none focus:border-black"
                    />
                    <span className="text-[10px] text-neutral-500 mt-1 block">
                      From your deployed Google Apps Script (must end in <code>/exec</code>)
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                        <FolderOpen className="w-3.5 h-3.5 text-neutral-500" />
                        <span>Google Drive Target Folder ID (Optional)</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. 1a2B3c4D5e6F7g8H9i0J (or leave blank to use Root folder)"
                      value={folderId}
                      onChange={(e) => setFolderId(e.target.value)}
                      className="w-full px-3 py-2 font-mono text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-white focus:outline-none focus:border-black"
                    />
                    <span className="text-[10px] text-neutral-500 mt-1 block">
                      Found in your Drive folder URL: <code>drive.google.com/drive/folders/<b>[FOLDER_ID]</b></code>
                    </span>
                  </div>

                  {/* Test Connection Button */}
                  <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={testing || !scriptUrl.trim()}
                      onClick={handleTestConnection}
                      className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-medium rounded-xs transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                    >
                      {testing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <HardDrive className="w-3.5 h-3.5" />}
                      <span>{testing ? 'Testing Webhook...' : 'Test Connection'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-xs font-semibold rounded-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded-xs hover:opacity-90"
                      >
                        Save Credentials
                      </button>
                    </div>
                  </div>

                  {/* Test Result Message */}
                  {testResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-xs flex items-start gap-2 border ${
                        testResult.success
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 text-emerald-800 dark:text-emerald-200'
                          : 'bg-red-50 dark:bg-red-950/50 border-red-300 text-red-800 dark:text-red-200'
                      }`}
                    >
                      {testResult.success ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      )}
                      <div className="text-[11px] leading-tight">
                        <strong className="block mb-0.5">
                          {testResult.success ? 'Success!' : 'Configuration Notice:'}
                        </strong>
                        <span>{testResult.message}</span>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}

              {activeTab === 'guide' && (
                <div className="space-y-4">
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xs text-[11px] text-amber-900 dark:text-amber-200">
                    <strong>1-Minute Free Setup:</strong> Google Apps Script allows your website to upload directly to your personal Google Drive with 15GB free storage, no credit card or Firebase billing needed!
                  </div>

                  <div className="space-y-3 font-sans">
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xs">
                      <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white mb-1">
                        <span className="w-5 h-5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center text-[10px]">1</span>
                        <span>Create Free Google Apps Script</span>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 text-[11px] ml-7">
                        Open <a href="https://script.google.com" target="_blank" rel="noreferrer" className="text-amber-600 dark:text-amber-400 underline inline-flex items-center gap-0.5">script.google.com <ExternalLink className="w-2.5 h-2.5" /></a> and click <strong>"New project"</strong>.
                      </p>
                    </div>

                    <div className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xs">
                      <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white mb-1">
                        <span className="w-5 h-5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center text-[10px]">2</span>
                        <span>Paste Code &amp; Deploy</span>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 text-[11px] ml-7 mb-2">
                        Paste the provided script code, then click:
                      </p>
                      <div className="ml-7 bg-neutral-900 text-neutral-200 p-2 rounded text-[11px] font-mono space-y-1">
                        <p>1. Click <strong>Deploy</strong> &gt; <strong>New deployment</strong></p>
                        <p>2. Select type: <strong>Web app</strong> (click gear icon)</p>
                        <p>3. Execute as: <strong>Me</strong></p>
                        <p>4. Who has access: <strong className="text-emerald-400">"Anyone"</strong> (Required so browser can upload)</p>
                        <p>5. Click <strong>Deploy</strong> &amp; Authorize access</p>
                      </div>
                    </div>

                    <div className="p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xs">
                      <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white mb-1">
                        <span className="w-5 h-5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center text-[10px]">3</span>
                        <span>Paste Web App URL in FAMA</span>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 text-[11px] ml-7">
                        Copy the generated <strong>Web App URL</strong> (ends in <code>/exec</code>) and paste it into the <strong>Settings &amp; URL</strong> tab above.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveTab('code')}
                      className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold rounded-xs"
                    >
                      View &amp; Copy Code &rarr;
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs">
                      Google Apps Script Code (Code.gs):
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedScript ? 'Copied Code!' : 'Copy Code'}</span>
                    </button>
                  </div>

                  <div className="relative">
                    <pre className="p-3.5 bg-neutral-950 text-neutral-200 font-mono text-[11px] rounded-xs border border-neutral-800 overflow-x-auto max-h-72 leading-relaxed">
                      {DEFAULT_APPS_SCRIPT_CODE}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
