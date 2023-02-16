export default function HeroSection() {
  return (
    <>
      <div class="p-5 my-5 text-center">
        <h1 class="display-6 fw-bold">Welcome to Vibely</h1>
        <div class="col-lg-8 mx-auto">
          <p class="lead mb-4">
            Your space for sharing skills, get involved in new hobbies and find
            friends to vibe with.
          </p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" class="btn btn-secondary btn-md px-4 gap-3">
              Check it out!
            </button>
            <button type="button" class="btn btn-outline-secondary btn-md px-4">
              Log in to your profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
