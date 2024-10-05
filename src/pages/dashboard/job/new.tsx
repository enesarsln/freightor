import { Helmet } from 'react-helmet-async';
// sections
import { JobCreateView } from 'src/sections/job/view';

// ----------------------------------------------------------------------

export default function JobCreatePage() {
  return (
    <>
      <Helmet>
        <title> Baggage to Miles</title>
      </Helmet>

      <JobCreateView />
    </>
  );
}
