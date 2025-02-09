import { Container } from "react-bootstrap";

function Footer() {
  return (
     <section class="bg-light">
      {/* <div class="container-lg"> */}
        <footer className="container-lg mt-5">
          <div className="pt-5">
            <h2 >Job Portal</h2>
          </div>
          
          <div className="row justify-content-center">
            <div className="col">
              <div className="p-2 text-light">
                <p>
                  <a href="#">FAQ</a>
                </p>
                <p>
                  <a href="#">Investors Relation</a>
                </p>
                <p>
                  <a href="#">Buy Gifts Cards</a>
                </p>
                <p>
                  <a href="#">Cookies Preferences</a>
                </p>
                <p>
                  <a href="#">Legal Guaranty</a>
                </p>
              </div>
            </div>
            <div className="col">
              <div className="p-2 text-light">
                <p>
                  <a href="#">Help Center</a>
                </p>
                <p>
                  <a href="#">Jobs</a>
                </p>
                
                <p>
                  <a href="#">Coporate Information</a>
                </p>
                <p>
                  <a href="#">Legal Notices</a>
                </p>
              </div>
            </div>
            <div className="col">
              <div className="p-2 text-light">
                <p>
                  <a href="#">Account</a>
                </p>
               
                <p>
                  <a href="#">Terms of Use</a>
                </p>
                <p>
                  <a href="#">Contact Us</a>
                </p>
               
              </div>
            </div>
            <div className="col">
              <div className="p-2 text-light">
                <p>
                  <a href="#">Media Center</a>
                </p>
                <p>
                  <a href="#">Redeem Gift Cards</a>
                </p>
                <p>
                  <a href="#">Privacy</a>
                </p>
                <p>
                  <a href="#">Speed Test</a>
                </p>
                <p>
                  <a href="#">Advert Choice</a>
                </p>
              </div>
            </div>
          </div>
          
        </footer>
    {/* </div> */}
  </section>
  );
}

export default Footer;
