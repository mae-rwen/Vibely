import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

export default function Introduction() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="p-4 text-start hpSection">
        <div className="col-lg-10 mx-auto">
        <h5 className=" fw-bold">What is this about?</h5>
          <p>
            Tempor cupidatat est Lorem aliquip cillum deserunt proident aliquip
            sit ad nisi laboris excepteur. Lorem in qui reprehenderit consequat
            nisi aliqua. Excepteur sint exercitation elit non id fugiat fugiat
            fugiat culpa id sit.
          </p>
          <Collapse in={open}>
            <div id="example-collapse-text">
              <p>
                Dolore tempor velit laborum aliqua ipsum labore cupidatat
                laborum officia mollit duis elit. Aute eu sunt et nisi excepteur
                aliquip et quis dolore consectetur magna Lorem aliqua duis.
              </p>
              <p>
                Magna dolore ullamco tempor incididunt id duis ut ut cillum
                Lorem. Nostrud labore nostrud reprehenderit aliqua enim esse ea
                enim do. Nulla eiusmod laborum eu eu aute ad quis eiusmod minim
                sint nostrud fugiat veniam. Quis tempor aliquip amet tempor
                deserunt nostrud quis do incididunt consequat ad pariatur elit
                ullamco. Cillum esse laboris in culpa ex proident. Sit voluptate
                enim ex officia enim anim do eu laborum non ad et velit. Laborum
                laboris excepteur commodo et mollit cillum do est.
              </p>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-start">
              <Button variant="outline-secondary" href="/instructions">Read more about it</Button>
              </div>
            </div>
          </Collapse>
          <p className="text-end showMoreP"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            {open ? ("show less"):("show more")}
          </p>
        </div>
      </div>
    </>
  );
}
