"use client";

import Link from "next/link";
import OfferSwiperWrapper from "@/components/templates/swiperWrapper/OfferSwiperWrapper";
import "./Offer.css";

function Offer({ product }) {
  const bestDiscounted = product
    .filter((p) => p.discountPrice != null && p.discountPrice < p.price)
    .sort((a, b) => {
      const discountA = ((a.price - a.discountPrice) / a.price) * 100;
      const discountB = ((b.price - b.discountPrice) / b.price) * 100;
      return discountB - discountA;
    })
    .slice(0, 6);

  return (
    <section className="discount">
      <div className="container">
        <div className="discount_wrapper">
          <div className="discount_right">
            <h3 className="discount_right_title">کالاهایی با بیشترین تخفیف</h3>
            <p className="discount_right_desc">
              در این سکشن شما میتوانید کالاهایی که تخفیف زیادی دارن رومشاهده
              کنید.
            </p>

            <div className="discount_right_timer">
              <span className="">زمان باقیمانده</span>

              <div className="timer_box">
                <div className="timer_box_item">
                  <span className="timer_box_item_number discount_second">
                    28
                  </span>
                  <span className="timer_box_item_label">ثانیه</span>
                </div>

                <div className="timer_box_item" id="box-center">
                  <span className="timer_box_item_number discount_minut">
                    :59
                  </span>
                  <span className="timer_box_item_label">دقیقه</span>
                </div>

                <div className="timer_box_item">
                  <span className="timer_box_item_number discount_hour">
                    :22
                  </span>
                  <span className="timer_box_item_label">ساعت</span>
                </div>
              </div>
            </div>

            <Link href={"#"} className="discount_right_btn">
              مشاهده همه
              <svg
                width="11"
                height="18"
                viewBox="0 0 11 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.00002 18L10.4 16.5L3.00002 9L10.4 1.5L9.00002 0L2.47955e-05 9L9.00002 18Z"
                  fill="white"
                ></path>
              </svg>
            </Link>
          </div>
          <div className="discount_left">
            {/* <UniversalSlider
              data={bestDiscounted}
              renderComponent={Card}
              loop={false}
              autoplay={false}
              customBreakpoints={{
                300: { slidesPerView: 2, spaceBetween: 10 },
                400: { slidesPerView: 2, spaceBetween: 10 },
                510: { slidesPerView: 3, spaceBetween: 10 },
                576: { slidesPerView: 2, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 15 },
                992: { slidesPerView: 6, spaceBetween: 20 },
              }}
            /> */}

            <OfferSwiperWrapper product={bestDiscounted} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Offer;
