import React from 'react';



const MainPage = () => {
    // const location = useLocation();
    // const navigate = useNavigate();
    return (
      <main className="w-100 mt-auto bg-secondary p-4">
       <div>
        <div class="flex flex-row flex-wrap justify-center md:justify-between>">
              <h3>Name:</h3>
              <div>
                <a href="#"><img src="#" alt="Image of an adoptable pet." /></a>
                <h3>Species</h3>
                <ul>
                  <div>Age</div>
                  <div>Gender</div>
                  <div>Size</div>
                  <div>Description</div>
                </ul>
              </div>
            </div>
        
        </div>
      </main>
    );
  };

  export default MainPage;