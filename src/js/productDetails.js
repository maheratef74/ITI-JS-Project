let courseDiv = document.getElementById("course");
let courseId = window.location.href.split("=")[1];

fetch(`https://my-json-server.typicode.com/Mahmoudshar0/courses-mock-data/courses/${courseId}`).then((res) => {
    return res.json()
}).then((courseData) => {
    courseDiv.innerHTML = `
        <div class="body-left-div">
                <div class="div-main-img">
                    <img src="" alt="">
                </div>
                <div>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <h2></h2>
                </div>
                <div class="left-div-icons">
                    <i class="fa-solid fa-book"></i>
                    <p></p>
                    <i class="fa-solid fa-clock"></i>
                    <p></p>
                    <i class="fa-solid fa-user"></i>
                    <p></p>
                </div>
                <div>
                    <button>
                        Overview
                    </button>
                    <button>
                        Curriculum
                    </button>
                    <button>
                        Instructor
                    </button>
                    <button>
                        Reviews
                    </button>
                    
                    <div class="course-description">
                        <h2>Course Description</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, reiciendis harum id corporis nisi veniam sequi dignissimos doloribus excepturi aliquid provident ratione quaerat sit, maxime fugit ullam ducimus? Laboriosam, eius!
                        Deserunt libero nisi rerum harum nesciunt ipsum nam qui, sapiente sit beatae a culpa, officia repudiandae consequuntur earum ratione enim repellat veritatis accusamus aspernatur expedita aperiam. Libero explicabo quisquam perferendis!</p>
                    </div>
                    <div class="what-learn">
                        <h2>What You Will Learn</h2>
                        <ul>
                            <li>Understand the basics of HTML5 and CSS3</li>
                            <li>Build responsive web pages using modern techniques</li>
                            <li>Implement interactive features with JavaScript</li>
                            <li>Optimize web performance and accessibility</li>
                        </ul>
                    </div>
                </div>




            </div>
            <div class="body-left-div">
                <div class="small-img">
                    <img src="" alt="">
                </div>
                <div>
                    <p></p>
                    <p></p>
                </div>
                <p></p>
                <button>BUY NOW</button>
                <div>
                    <p>Start Date</p>
                    <p></p>
                </div>
                <div>
                    <p>Enrolled</p>
                    <p></p>
                </div>
                <div>
                    <p>Lectures</p>
                    <p></p>
                </div>
                <div>
                    <p>Skill Level</p>
                    <p></p>
                </div>
                <div>
                    <p>ClassName Day</p>
                    <p></p>
                </div>
                <div>
                    <p>Language</p>
                    <p></p>
                </div>
            </div>
        `;
})