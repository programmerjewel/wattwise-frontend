
import { Link } from 'react-router';

const Errorpage = () => {
  return (
    <main className='flex flex-col min-h-screen items-center justify-center gap-4'>
      <h2 className='text-6xl font-semibold uppercase'>Error 404</h2>
      <p>The content you are looking for doesn't exist</p>
      <Link to={'/'} className='btn btn-primary'>Go to Home</Link>
    </main>
  );
};

export default Errorpage;