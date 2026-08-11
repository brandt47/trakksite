import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";

const components: MDXComponents = {
  img: (props) => (
    <span className="my-8 block overflow-hidden rounded-2xl">
      <Image
        sizes="(min-width: 768px) 768px, 100vw"
        className="h-auto w-full object-cover"
        {...(props as ImageProps)}
      />
    </span>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
