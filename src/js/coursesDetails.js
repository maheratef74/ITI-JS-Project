let courseDiv = document.getElementById("course");
let courseId = new URLSearchParams(window.location.search).get('id');
let item = {};
if (!courseId) {
    courseDiv.innerHTML = "<p style='text-align:center;color:red;'>No course ID found in URL!</p>";
} else {
    fetch(`https://my-json-server.typicode.com/maheratef74/ITI-JS-Project/courses/${courseId}`)
        .then((res) => {
            if (!res.ok) throw new Error("Course not found");
            return res.json();
        })
        .then((courseData) => {
            item = courseData;
            console.log(item)
            const fullStars = Math.floor(courseData.rating);
            const emptyStars = 5 - fullStars;
            const starsHTML = '★'.repeat(fullStars) + '☆'.repeat(emptyStars);

            courseDiv.innerHTML = `
                <div class="body-left-div">
                    <div class="div-main-img">
                        <img src="${courseData.image}" alt="${courseData.title}">
                    </div>

                    <div class="rating-section">
                        <div class="stars">
                            ${starsHTML}
                            <span class="rating-number">(${courseData.rating})</span>
                        </div>
                        <h2>${courseData.title}</h2>
                    </div>

                    <div class="left-div-icons">
                        <i class="fa-solid fa-book"></i>
                        <p>${courseData.lessons} Lessons</p>

                        <i class="fa-solid fa-clock"></i>
                        <p>${courseData.duration}</p>

                        <i class="fa-solid fa-user"></i>
                        <p>${courseData.students}+ Students</p>
                    </div>

                    <div class="tabs">
                        <button class="tab-btn active">Overview</button>
                        <button class="tab-btn">Curriculum</button>
                        <button class="tab-btn">Instructor</button>
                        <button class="tab-btn">Reviews</button>
                    </div>

                    <div class="tab-content">
                        <div class="course-description">
                            <h2>COURSE DESCRIPTION</h2>
                            <p>${courseData.description}</p>
                        </div>

                        <div class="what-learn">
                            <h2>WHAT WILL I LEARN FROM THIS COURSE?</h2>
                            <p>${courseData.whatLearn}</p>
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="body-right-div">
                    <div class="small-img">
                        <img src="${courseData.image}" alt="${courseData.title}">
                    </div>

                    <div class="price-section">
                        <p class="current-price">$${courseData.price}</p>
                        <p class="original-price">$${courseData.originalPrice}</p>
                    </div>

                    <p class="guarantee">${courseData.guarantee}</p>

                    <button class="buy-now-btn">BUY NOW</button>


                    <div class="info-row">
                        <p>Start Date</p>
                        <p>${courseData.startDate}</p>
                    </div>
                    <div class="info-row">
                        <p>Enrolled</p>
                        <p>${courseData.enrolled}</p>
                    </div>
                    <div class="info-row">
                        <p>Lectures</p>
                        <p>${courseData.lectures}</p>
                    </div>
                    <div class="info-row">
                        <p>Skill Level</p>
                        <p>${courseData.skillLevel}</p>
                    </div>
                    <div class="info-row">
                        <p>Class Day</p>
                        <p>${courseData.classDays}</p>
                    </div>
                    <div class="info-row">
                        <p>Language</p>
                        <p>${courseData.language}</p>
                    </div>
                </div>
            `;
            let buyNowBtn = document.querySelector(".buy-now-btn");
            buyNowBtn.addEventListener("click", function () {
                addToSession(item);
            });

            function addToSession(item) {

                let cart = sessionStorage.getItem("edunityCart");

                if (cart) {
                    cart = JSON.parse(cart);
                } else {
                    cart = [];
                }

                let exist = cart.find((c) => c.id === item.id);
                if (exist) {
                    alert("course already in cart");
                    return;
                }
                cart.push(item);


                sessionStorage.setItem("edunityCart", JSON.stringify(cart));

                alert("course added to cart");
            }

        })
        .catch((err) => {
            console.error(err);
            courseDiv.innerHTML = "<p style='text-align:center;color:red;'>Failed to load course. Please try again later.</p>";
        });
}


