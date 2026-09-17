import TopNav from "./createEvent/TopNav";
import Spinner from "./SpinnerComponent";

const fieldClass = "block w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7a0019] focus:border-[#7a0019] transition-colors sm:text-sm";

const CreateEventForm = ({ values, isLoading, onChange, onSubmit }) => (
  <div className="create-event-page min-h-screen"><TopNav /><main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
    <div className="mb-8"><p className="page-kicker mb-2">Host an event</p><h1 className="font-display text-3xl font-semibold text-maroon">Create Event</h1><p className="page-subtitle mt-2 text-sm">Fill in the details for your campus event.</p></div>
    <div className="create-event-card rounded-2xl p-6 sm:p-8"><form onSubmit={onSubmit} className="space-y-6">
      <div><label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1.5">Event Title</label><input id="title" name="title" value={values.title} onChange={onChange} type="text" required placeholder="e.g., Community Hackathon 2026" className={fieldClass} /></div>
      <div><label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label><textarea id="description" name="description" rows={5} value={values.description} onChange={onChange} required placeholder="Tell people what your event is about..." className={`${fieldClass} resize-y`} /></div>
      <div><label htmlFor="bannerUrl" className="block text-sm font-semibold text-gray-700 mb-1.5">Banner Image URL (optional)</label><input id="bannerUrl" name="bannerUrl" value={values.bannerUrl} onChange={onChange} type="url" placeholder="Used for the event detail page header" className={fieldClass} /></div>
      <div><label htmlFor="venue" className="block text-sm font-semibold text-gray-700 mb-1.5">Venue</label><input id="venue" name="venue" value={values.venue} onChange={onChange} type="text" required placeholder="e.g., Coffman Memorial Union" className={fieldClass} /></div>
      <div><label htmlFor="capacity" className="block text-sm font-semibold text-gray-700 mb-1.5">Capacity <span className="text-red-500">*</span></label><input id="capacity" name="capacity" type="number" min="1" value={values.capacity} onChange={onChange} required placeholder="e.g., 50" className={fieldClass} /></div>
      <div><label htmlFor="thumbnailUrl" className="block text-sm font-semibold text-gray-700 mb-1.5">Thumbnail Image URL <span className="text-red-500">*</span></label><input id="thumbnailUrl" name="thumbnailUrl" value={values.thumbnailUrl} onChange={onChange} type="url" required placeholder="Used for the event grid card image" className={fieldClass} /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6"><div><label htmlFor="startsAt" className="block text-sm font-semibold text-gray-700 mb-1.5">Starts At <span className="text-red-500">*</span></label><input id="startsAt" name="startsAt" value={values.startsAt} onChange={onChange} required type="datetime-local" className={fieldClass} /></div><div><label htmlFor="endsAt" className="block text-sm font-semibold text-gray-700 mb-1.5">Ends At <span className="text-red-500">*</span></label><input id="endsAt" name="endsAt" value={values.endsAt} onChange={onChange} required type="datetime-local" className={fieldClass} /></div></div>
      <div className="pt-4"><button disabled={isLoading} type="submit" className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#7a0019] hover:bg-[#5a0012] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7a0019] transition-colors shadow-sm">{isLoading ? <span className="flex items-center gap-2"><Spinner />Creating...</span> : "Create Event"}</button></div>
    </form></div>
  </main></div>
);

export default CreateEventForm;
