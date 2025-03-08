import Image from "next/image";
import Link from "next/link";

interface Props {
  imgUrl: string;
  title: string;
  alt: string;
  href?: string;
  textStyles: string;
  imgStyles?: string;
  value: number | string;
  isAuthor?: boolean;
}
const Metric = ({
  imgUrl,
  alt,
  value,
  textStyles,
  imgStyles,
  title,
  isAuthor,
  href,
}: Props) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`rounded-full object-contain ${imgStyles}`}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}{" "}
        <span
          className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}
        >
          {title}
        </span>
      </p>
    </>
  );
  return href ? (
    <Link href={href} className="flex-center gap-1">
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  );
};

export default Metric;
