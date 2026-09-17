import Spinner from "./SpinnerComponent";

const VerifyEmailView = ({ email, isLoading, inputsRef, onSubmit }) => (
  <div className="auth-page min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
    <div className="w-full max-w-5xl"><div className="auth-card verify-card rounded-2xl overflow-hidden">
      <div className="auth-brand px-8 py-8 text-center"><div className="mx-auto h-14 w-14 bg-white rounded-xl flex items-center justify-center shadow-lg mb-3"><span className="text-[#7a0019] font-bold text-xl">M</span></div><h2 className="font-sans text-xl font-bold text-white">Verify Your Email</h2><p className="mt-1 text-[#ffcc33] text-xs font-semibold uppercase tracking-wider">Gopher Event</p><p className="auth-brand-note">Discover campus life, one event at a time.</p></div>
      <div className="px-8 py-8 text-center"><p className="text-sm text-gray-600 mb-6">We sent a 6-digit code to <span className="font-semibold text-gray-900">{email}</span></p><form className="space-y-6" onSubmit={onSubmit}><div className="flex justify-center gap-2">{[0, 1, 2, 3, 4, 5].map((index) => <input key={index} ref={(element) => { inputsRef.current[index] = element; }} name={`otp-${index}`} type="text" maxLength={1} inputMode="numeric" pattern="[0-9]" placeholder="•" required className="w-12 h-14 text-center text-2xl font-bold text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7a0019] focus:border-[#7a0019] focus:bg-white transition-colors" />)}</div><button type="submit" disabled={isLoading} className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg text-sm font-bold text-white bg-[#7a0019] hover:bg-[#5a0012] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7a0019] transition-colors">{isLoading ? <Spinner /> : "Verify Email"}</button></form></div>
    </div></div>
  </div>
);

export default VerifyEmailView;
