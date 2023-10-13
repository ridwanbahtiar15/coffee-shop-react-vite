import React from "react";
import getImageUrl from "../../utils/imageGetter";

function Home() {
  return (
    <>
      <nav className="w-full flex justify-between py-4 px-5 items-center font-plusJakartaSans bg-[#0B0909] md:px-24 lg:px-[130px]">
        <div className="nav-start flex items-center gap-x-[60px] text-sm font-normal">
          <img
            src={getImageUrl("coffee-shop-white", "svg")}
            alt="logo"
            className="w-32 h-8"
          />
          <a
            href="/home"
            className="text-light hover:border-b-2 border-primary border-b-2 hidden lg:block"
          >
            Home
          </a>
          <a
            href="/product"
            className="text-light hover:border-b-2 hover:border-primary focus:border-b-2 focus:border-primary hidden lg:block"
          >
            Product
          </a>
        </div>
        <div className="nav-end flex gap-x-[22px] items-center">
          <a href="#" className="icon-search hidden lg:block">
            <img
              src={getImageUrl("Search-white", "svg")}
              alt="Search"
              className="w-full h-full"
            />
          </a>
          <a href="#" className="hidden lg:block">
            <img
              src={getImageUrl("ShoppingCart-white", "svg")}
              alt="ShoppingCart"
              className="w-full h-full"
            />
          </a>
          <a
            href="#"
            className="text-light text-sm font-medium py-3 px-[18px] border border-[#ebeaea] hover:bg-light hover:text-dark rounded-md hidden lg:block active:ring active:ring-slate-300"
          >
            Sign In
          </a>
          <a
            href="#"
            className="text-dark text-sm font-medium py-3 px-[18px] bg-primary hover:bg-amber-600 rounded-md hidden lg:block active:ring active:ring-orange-300"
          >
            Sign Up
          </a>
          <div className="text-2xl lg:hidden" id="burger-menu">
            <img
              src={getImageUrl("burger-menu", "svg")}
              alt="burger-menu"
              id="burger-menu"
              className="w-full h-full"
            />
          </div>
        </div>
      </nav>
      <nav
        id="dropdown-mobile"
        className="w-full h-full font-plusJakartaSans py-4 px-5 border-b-[1px] border-b-[#E8E8E8] hidden md:px-24 lg:hidden"
      >
        <ul className="flex flex-col gap-y-2">
          <li className="p-1 hover:bg-primary hover:font-medium">
            <a href="/home">Home</a>
          </li>
          <li className="p-1 hover:bg-primary hover:font-medium">
            <a href="/product">Product</a>
          </li>
          <li className="p-1 hover:bg-primary hover:font-medium">
            <a href="#">Search</a>
          </li>
          <li className="p-1 hover:bg-primary hover:font-medium">
            <a href="/login">Sign In</a>
          </li>
          <li className="p-1 hover:bg-primary hover:font-medium">
            <a href="/register">Sign Up</a>
          </li>
        </ul>
      </nav>
      <header className="flex flex-wrap font-plusJakartaSans">
        <div className="w-full h-screen select-none flex items-center py-4 px-5 md:px-24 lg:px-[130px] max-[1400px]:h-[700px] min-[1400px]:h-[1024px] xl:w-1/2 header-section">
          <article className="flex flex-col gap-y-6 items-baseline relative">
            <h1 className="text-light text-2xl font-medium leading-tight md:text-5xl md:leading-snug">
              Start Your Day with Coffee and Good Meals
            </h1>
            <span className="text-sm font-normal text-light md:text-base">
              We provide high quality beans, good taste, and healthy meals made
              by love just for you. Start your day with us for a bigger smile!
            </span>
            <a
              href="#"
              className="text-sm font-medium text-dark p-[10px] bg-primary rounded-md w-[143px] h-[50px] flex items-center justify-center hover:bg-amber-600 active:ring active:ring-orange-300"
            >
              Get Started
            </a>
            <div className="flex justify-between self-stretch">
              <span className="flex flex-col gap-y-3">
                <p className="text-2xl font-medium text-primary md:text-5xl">
                  90+
                </p>
                <p className="text-xs font-normal text-light md:text-base">
                  Staff
                </p>
              </span>
              <div className="w-[2px] h-18 bg-light md:h-20"></div>
              <span className="flex flex-col gap-y-3">
                <p className="text-2xl font-medium text-primary md:text-5xl">
                  30+
                </p>
                <p className="text-xs font-normal text-light md:text-base">
                  Stores
                </p>
              </span>
              <div className="w-[2px] h-18 bg-light md:h-20"></div>
              <span className="flex flex-col gap-y-3">
                <p className="text-2xl font-medium text-primary md:text-5xl">
                  800+
                </p>
                <p className="text-xs font-normal text-light md:text-base">
                  Customer
                </p>
              </span>
            </div>
            <div className="absolute bottom-20 right-0 p-3 bg-primary rounded-full md:bottom-[100px] xl:hidden">
              <img
                src="assets/img/ChatCircleDots.svg"
                alt="ChatCircleDots"
                className="w-8 h-8"
              />
            </div>
          </article>
        </div>
        <div
          className={`bg-[url('/src/assets/img/Rectangle287.webp')] max-[1400px]:h-[700px] min-[1400px]:h-[1024px] relative hidden xl:w-1/2 xl:block`}
        >
          <div className="absolute bottom-24 right-24 p-3 bg-primary rounded-full">
            <img
              src={getImageUrl("ChatCircleDots", "svg")}
              alt="ChatCircleDots"
              className="max-w-full max-h-full"
            />
          </div>
        </div>
        <div className="w-full h-screen flex items-center py-4 px-5 md:px-24 lg:px-[130px] xl:h-[574px] xl:w-1/2">
          <article className="flex flex-col gap-y-6">
            <div className="flex gap-x-6 items-center flex-col gap-y-4 xl:flex-row">
              <div className="hidden bg-primary md:w-4 h-16 xl:block"></div>
              <h1 className="text-2xl font-medium leading-tight text-dark text-center md:text-5xl xl:text-left">
                We Provide <span className="text-[#8E6447]">Good Coffee</span>{" "}
                and
                <span className="text-[#8E6447]">Healthy Meals</span>
              </h1>
              <div className="bg-primary w-12 h-1 lg:w-16 lg:h-2 xl:hidden"></div>
            </div>
            <span className="text-sm font-normal text-secondary text-center md:text-base xl:text-left">
              You can explore the menu that we provide with fun and have their
              own taste and make your day better.
            </span>
            <div className="flex flex-col gap-y-6">
              <div className="flex items-center gap-x-[10px]">
                <div>
                  <img
                    src={getImageUrl("check-circle", "svg")}
                    alt="check"
                    className="w-full h-full"
                  />
                </div>
                <span className="text-sm font-normal text-secondary">
                  High quality beans
                </span>
              </div>
              <div className="flex items-center gap-x-[10px]">
                <div>
                  <img
                    src={getImageUrl("check-circle", "svg")}
                    alt="check"
                    className="w-full h-full"
                  />
                </div>
                <span className="text-sm font-normal text-secondary">
                  Healthy meals, you can request the ingredients
                </span>
              </div>
              <div className="flex items-center gap-x-[10px]">
                <div>
                  <img
                    src={getImageUrl("check-circle", "svg")}
                    alt="check"
                    className="w-full h-full"
                  />
                </div>
                <span className="text-sm font-normal text-secondary">
                  Chat with our staff to get better experience for ordering
                </span>
              </div>
              <div className="flex items-center gap-x-[10px]">
                <div>
                  <img
                    src={getImageUrl("check-circle", "svg")}
                    alt="check"
                    className="w-full h-full"
                  />
                </div>
                <span className="text-sm font-normal text-secondary">
                  Free member card with a minimum purchase of IDR 200.000.
                </span>
              </div>
            </div>
          </article>
        </div>
        <div className="bg-[url('src/assets/img/Rectangle291.webp')] h-[574px] hidden xl:block xl:w-1/2"></div>
      </header>
      <main className="font-plusJakartaSans px-5 md:px-24 lg:py-20 lg:px-[130px]">
        <div className="items-center text-center flex flex-col gap-y-5">
          <h1 className="text-2xl font-medium text-dark md:text-5xl">
            Here is Peoples <span className="text-[#8E6447]">Favorite</span>
          </h1>
          <div className="bg-primary w-12 h-1 lg:w-16 lg:h-2"></div>
          <span className="text-sm font-normal text-secondary md:text-base">
            Let’s choose and have a bit taste of poeple’s favorite. It might be
            yours too!
          </span>
        </div>
        <div className="mt-6 flex flex-col gap-y-6 md:flex-row md:flex-wrap md:justify-between xl:flex-nowrap xl:gap-x-5">
          <div className="flex flex-col items-center md:w-[48%] xl:w-full">
            <img
              src={getImageUrl("image27", "webp")}
              alt="product"
              className="w-full h-full"
            />
            <div className="w-[95%] flex flex-col gap-y-3 p-[10px] bg-light drop-shadow-md relative bottom-16">
              <span className="text-xl font-medium text-dark lg:text-[22px]">
                Hazelnut Latte
              </span>
              <p className="text-sm font-normal text-dark">
                You can explore the menu that we provide with fun and have their
                own taste and make your day better.
              </p>
              <p className="text-lg font-medium text-dark lg:text-[22px]">
                IDR 20.000
              </p>
              <div className="flex flex-col gap-y-2 md:flex-row md:justify-between md:gap-x-2">
                <button
                  type="button"
                  className="text-sm md:text-base font-medium text-dark bg-primary p-2 rounded-md hover:bg-amber-600 active:ring active:ring-orange-300 md:w-3/4"
                >
                  Buy
                </button>
                <button
                  type="button"
                  className="text-base font-medium border-2 border-primary text-dark bg-light p-2 rounded-md hover:bg-slate-200 active:ring active:ring-orange-300 flex justify-center items-center md:w-1/4"
                >
                  <div>
                    <img
                      src={getImageUrl("ShoppingCartOrange", "svg")}
                      alt="cart"
                      className="w-full h-full"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center md:w-[48%] xl:w-full">
            <img
              src={getImageUrl("image22", "webp")}
              alt="product"
              className="w-full h-full"
            />
            <div className="w-[95%] flex flex-col gap-y-3 p-[10px] bg-light drop-shadow-md relative bottom-16">
              <span className="text-xl font-medium text-dark lg:text-[22px]">
                Hazelnut Latte
              </span>
              <p className="text-sm font-normal text-dark">
                You can explore the menu that we provide with fun and have their
                own taste and make your day better.
              </p>
              <p className="text-lg font-medium text-dark lg:text-[22px]">
                IDR 20.000
              </p>
              <div className="flex flex-col gap-y-2 md:flex-row md:justify-between md:gap-x-2">
                <button
                  type="button"
                  className="text-sm lg:text-base font-medium text-dark bg-primary p-2 rounded-md hover:bg-amber-600 active:ring active:ring-orange-300 md:w-3/4"
                >
                  Buy
                </button>
                <button
                  type="button"
                  className="text-base font-medium border-2 border-primary text-dark bg-light p-2 rounded-md hover:bg-slate-200 active:ring active:ring-orange-300 flex justify-center items-center md:w-1/4"
                >
                  <div>
                    <img
                      src={getImageUrl("ShoppingCartOrange", "svg")}
                      alt="cart"
                      className="w-full h-full"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center md:w-[48%] xl:w-full">
            <img
              src={getImageUrl("image30", "webp")}
              alt="product"
              className="w-full h-full"
            />
            <div className="w-[95%] flex flex-col gap-y-3 p-[10px] bg-light drop-shadow-md relative bottom-16">
              <span className="text-xl font-medium text-dark lg:text-[22px]">
                Hazelnut Latte
              </span>
              <p className="text-sm font-normal text-dark">
                You can explore the menu that we provide with fun and have their
                own taste and make your day better.
              </p>
              <p className="text-lg font-medium text-dark lg:text-[22px]">
                IDR 20.000
              </p>
              <div className="flex flex-col gap-y-2 md:flex-row md:justify-between md:gap-x-2">
                <button
                  type="button"
                  className="text-sm lg:text-base font-medium text-dark bg-primary p-2 rounded-md hover:bg-amber-600 active:ring active:ring-orange-300 md:w-3/4"
                >
                  Buy
                </button>
                <button
                  type="button"
                  className="text-base font-medium border-2 border-primary text-dark bg-light p-2 rounded-md hover:bg-slate-200 active:ring active:ring-orange-300 flex justify-center items-center md:w-1/4"
                >
                  <div>
                    <img
                      src={getImageUrl("ShoppingCartOrange", "svg")}
                      alt="cart"
                      className="w-full h-full"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center md:w-[48%] xl:w-full">
            <img
              src={getImageUrl("image31", "webp")}
              alt="product"
              className="w-full h-full"
            />
            <div className="w-[95%] flex flex-col gap-y-3 p-[10px] bg-light drop-shadow-md relative bottom-16">
              <span className="text-xl font-medium text-dark lg:text-[22px]">
                Hazelnut Latte
              </span>
              <p className="text-sm font-normal text-dark">
                You can explore the menu that we provide with fun and have their
                own taste and make your day better.
              </p>
              <p className="text-lg font-medium text-dark lg:text-[22px]">
                IDR 20.000
              </p>
              <div className="flex flex-col gap-y-2 md:flex-row md:justify-between md:gap-x-2">
                <button
                  type="button"
                  className="text-sm lg:text-base font-medium text-dark bg-primary p-2 rounded-md hover:bg-amber-600 active:ring active:ring-orange-300 md:w-3/4"
                >
                  Buy
                </button>
                <button
                  type="button"
                  className="text-base font-medium border-2 border-primary text-dark bg-light p-2 rounded-md hover:bg-slate-200 active:ring active:ring-orange-300 flex justify-center items-center md:w-1/4"
                >
                  <div>
                    <img
                      src={getImageUrl("ShoppingCartOrange", "svg")}
                      alt="cart"
                      className="w-full h-full"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <section className="font-plusJakartaSans py-12 px-5 md:px-24 lg:px-[130px] lg:py-10 bg-[#E8E8E84D]">
        <div className="items-center text-center flex flex-col gap-y-5">
          <h1 className="text-2xl font-medium text-dark md:text-5xl">
            <span className="text-[#8E6447]">Visit Our Store</span> in the Spot
            on the Map Below
          </h1>
          <div className="bg-primary w-12 h-1 lg:w-16 lg:h-2"></div>
          <span className="text-sm font-normal text-secondary md:text-base md:w-[50%]">
            You can explore the menu that we provide with fun and have their own
            taste and make your day better.
          </span>
        </div>
        <div className="mt-16">
          <img
            src={getImageUrl("map", "webp")}
            alt="map"
            className="w-full h-full"
          />
        </div>
      </section>
      <section className="font-plusJakartaSans py-12 px-5 md:px-24 lg:px-[130px] lg:py-10 bg-gradient-to-br from-[#777c82_-114.74%] to-[#0b0909_91.35%]">
        <div className="flex flex-col gap-y-4 md:gap-x-5 lg:flex-row lg:items-center">
          <div className="lg:w-1/2">
            <img
              src={getImageUrl("Rectangle295", "webp")}
              alt="profile-image-testimonial"
              className="w-full h-full lg:w-auto lg:h-auto"
            />
          </div>
          <div className="flex flex-col gap-y-4 md:gap-y-6 lg:w-1/2">
            <span className="text-sm md:text-base font-normal text-light">
              TESTIMONIAL
            </span>
            <div className="flex gap-x-5 items-center">
              <div className="bg-primary w-1 h-10 md:w-2 md:h-16 xl:block"></div>
              <h1 className="text-2xl font-medium leading-tight text-light text-center md:text-5xl xl:text-left">
                Viezh Robert
              </h1>
            </div>
            <span className="text-sm md:text-base font-normal text-primary">
              Manager Coffee Shop
            </span>
            <span className="text-sm md:text-base font-normal text-light">
              “Wow... I am very happy to spend my whole day here. the Wi-fi is
              good, and the coffee and meals tho. I like it here!! Very
              recommended!
            </span>
            <div className="self-baseline">
              <img
                src={getImageUrl("star", "webp")}
                alt="star"
                className="w-full h-full"
              />
            </div>
            <div className="flex gap-x-3 self-baseline">
              <img
                src={getImageUrl("arrow-left", "webp")}
                alt="arrow-left"
                className="w-full h-full"
              />
              <img
                src={getImageUrl("arrow-right", "webp")}
                alt="arrow-right"
                className="w-full h-full"
              />
            </div>
            <div className="self-baseline pt-10">
              <img
                src={getImageUrl("paginate", "webp")}
                alt="paginate"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
      <footer className="font-plusJakartaSans p-5 mt-5 flex flex-wrap gap-y-8 sm:px-5 md:px-24 pt md:pt-10 md:pb-20 md:mt-10 lg:px-[130px] bg-[#F8F8F8]">
        <section className="flex flex-col gap-y-6 w-full lg:self-end lg:w-2/5 lg:pr-16">
          <img
            src={getImageUrl("coffee-shop", "webp")}
            alt="logo"
            className="w-32 h-8"
          />
          <span className="text-base font-normal text-secondary">
            Coffee Shop is a store that sells some good meals, and especially
            coffee. We provide high quality beans
          </span>
          <span className="font-rubik text-base font-semibold text-dark">
            &copy;2020CoffeeStore
          </span>
        </section>
        <section className="flex flex-col gap-y-5 w-full sm:w-1/3 md:1/3 lg:w-1/5">
          <p className="text-base font-medium text-dark">Product</p>
          <p className="text-sm font-normal text-secondary">Our Product</p>
          <p className="text-sm font-normal text-secondary">Pricing</p>
          <p className="text-sm font-normal text-secondary">Locations</p>
          <p className="text-sm font-normal text-secondary">Countries</p>
          <p className="text-sm font-normal text-secondary">Blog</p>
        </section>
        <section className="flex flex-col gap-y-5 w-full sm:w-1/3 md:1/3 lg:w-1/5">
          <p className="text-base font-medium text-dark">Engage</p>
          <p className="text-sm font-normal text-secondary">Partner</p>
          <p className="text-sm font-normal text-secondary">FAQ</p>
          <p className="text-sm font-normal text-secondary">About Us</p>
          <p className="text-sm font-normal text-secondary">Provice Policy</p>
          <p className="text-sm font-normal text-secondary">Term of Services</p>
        </section>
        <section className="social-media w-full sm:w-1/3 md:1/3 lg:w-1/5">
          <p className="text-base font-medium text-dark mb-4">Social Media</p>
          <div className="flex">
            <div>
              <img
                src={getImageUrl("Facebook", "svg")}
                alt="Facebook"
                className="w-full h-full"
              />
            </div>
            <div>
              <img
                src={getImageUrl("Twitter", "svg")}
                alt="Twitter"
                className="w-full h-full"
              />
            </div>
            <div>
              <img
                src={getImageUrl("Instagram", "svg")}
                alt="Instagram"
                className="w-full h-full"
              />
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}

export default Home;