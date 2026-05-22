interface Props {
  mathChallengeEnabled: boolean;
  phoneAliasEnabled: boolean;
  handleToggleSetting: (key: string, current: boolean) => void;
}

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full p-0.5 cursor-pointer flex items-center shadow-inner transition-colors duration-250 ${
        enabled ? 'bg-[#D4900A] justify-end' : 'bg-slate-300 justify-start'
      }`}
    >
      <div className="bg-white w-5 h-5 rounded-full shadow-md" />
    </button>
  );
}

export default function SystemSettingsView({ mathChallengeEnabled, phoneAliasEnabled, handleToggleSetting }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-[0_12px_40px_rgba(150,155,170,0.06)] max-w-lg mx-auto space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-display font-bold text-slate-800 tracking-tight">Security Settings</h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">Configure global security parameters. These defaults apply when no per-user override is set.</p>
      </div>

      <div className="space-y-4">
        {/* Math Challenge */}
        <div className="flex justify-between items-center p-4 border border-slate-200/80 rounded-xl transition-all hover:border-[#D4900A]/35 shadow-sm">
          <div>
            <p className="font-semibold text-slate-800 text-sm">Post-Login Math Challenge</p>
            <p className="text-[11px] text-slate-500 font-medium">Require numeric answers to secure admin sessions.</p>
          </div>
          <Toggle enabled={mathChallengeEnabled} onToggle={() => handleToggleSetting('math_challenge_enabled', mathChallengeEnabled)} />
        </div>

        {/* Phone Alias */}
        <div className="flex justify-between items-center p-4 border border-slate-200/80 rounded-xl transition-all hover:border-[#D4900A]/35 shadow-sm">
          <div>
            <p className="font-semibold text-slate-800 text-sm">Phone Domain Alias Rules</p>
            <p className="text-[11px] text-slate-500 font-medium">Map login aliases to support secure local phone routing.</p>
          </div>
          <Toggle enabled={phoneAliasEnabled} onToggle={() => handleToggleSetting('phone_alias_enabled', phoneAliasEnabled)} />
        </div>
      </div>
    </div>
  );
}
