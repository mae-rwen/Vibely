
import SingleCard from './SingleCard';

export default function Categories() {

  return (
    <>
    <div className="categoriesHeader">
            <h1 className="display-6 fw-bold text-center">Explore all categories</h1>
            <div className="col-lg-8 mx-auto text-end">
                <p>There are XX events happening in your location during the next 2 weeks</p>
                <p><a href="#">Click here</a> to change your location. *To change the time scope, browse category of your choice.</p>
            </div>
        </div>
    <SingleCard />
    </>
  )
}
