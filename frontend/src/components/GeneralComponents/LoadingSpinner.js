import Spinner from 'react-bootstrap/Spinner';

export default function LoadingSpinner() {
  return (
    <div className="spinner">
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" />
    </div>
  )
}
