import Link from "next/link";
import style from "./Card.module.css";

function Card({ item }) {

  const isUsage = item.type === "usage";
  const isBrand = item.type === "brand";

  const href = isUsage
    ? `/products/laptops?usage=${item.slug}`
    : `/products/laptops?brand=${item.slug}`;
  return (
    <div className={style.laptop_brand_items}>
      <Link href={href}>
        <div className={style.laptop_brnad_img}>
          <img src={item.image} alt={item.title} />
        </div>
        <span>{item.title}</span>
      </Link>
    </div>
  );
}

export default Card;
