import { useQuery } from '@tanstack/react-query';
import { motion, stagger, type Variants } from 'motion/react';
import { FaCartPlus } from 'react-icons/fa';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { MotionButton } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { productsQueryOptions } from '@/features/products/products.queries';
import { useCartStore } from '@/store/products.store';
import type { Product } from '@/types/product.types';

export function Products() {
  const { data, error } = useQuery(productsQueryOptions);
  const addToCart = useCartStore((state) => state.addToCart);
  const searchItem = useCartStore((state) => state.searchItem);
  const sortBy = useCartStore((state) => state.sortBy);

  const filteredData = data
    ?.filter((product: Product) => product.title.toLowerCase().includes(searchItem.toLowerCase()))
    .sort((a: Product, b: Product) => {
      if (!sortBy) return 0;
      const { type, order } = sortBy;
      if (type === 'price') {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (type === 'title') {
        return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      }
      return 0;
    });

  const containerVariants: Variants = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        delayChildren: stagger(0.1, { startDelay: 0.3 }),
        ease: 'easeIn',
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
        ease: 'easeOut',
      },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, transition: { ease: 'easeOut' } },
    visible: { opacity: 1, y: 0, transition: { ease: 'linear' } },
  };

  if (error)
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-destructive"
      >
        Failed to load products.
      </motion.div>
    );
  if (!data || data.length === 0)
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-muted"
      >
        No products found.
      </motion.div>
    );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-4 grid grid-cols-2 justify-items-center gap-4 md:grid-cols-3"
    >
      {filteredData?.map((product: Product) => (
        <motion.div key={product.id} variants={itemVariants} className="h-full w-full">
          <Card className="relative mx-auto flex h-full w-full max-w-sm flex-col pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/15" />
            <img
              src={product.image}
              alt={product.title}
              className="relative z-20 aspect-video w-full object-contain py-2"
            />
            <Badge variant="secondary" className="absolute top-1 right-1 z-50">
              ${product.price}
            </Badge>
            <CardHeader className="flex-1">
              <CardTitle className="line-clamp-2">{product.title}</CardTitle>
              <CardDescription className="line-clamp-3">{product.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <MotionButton
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'tween', duration: 0.1, ease: 'easeOut' }}
                className="w-full hover:cursor-pointer"
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.title} added to cart!`);
                }}
              >
                <FaCartPlus /> <p>Add to Cart</p>
              </MotionButton>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
