import { useQuery } from '@tanstack/react-query';
import { motion, stagger, type Variants } from 'motion/react';
import { FaCartPlus } from 'react-icons/fa';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchProducts } from '@/features/shopping-cart/shopping-cart.api';

export function ProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
  });

  const containerVariants: Variants = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        delay: 1,
        delayChildren: stagger(0.1, { startDelay: 0.7 }),
        ease: 'easeInOut',
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
      },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
  if (isLoading)
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-muted"
      >
        Loading...
      </motion.div>
    );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 justify-items-center gap-4 md:grid-cols-3"
    >
      {data?.map((product) => (
        <motion.div key={product.id} variants={itemVariants} className="h-full w-full">
          <Card className="relative mx-auto flex h-full w-full max-w-sm flex-col pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
              src={product.image}
              alt={product.title}
              className="relative z-20 aspect-video w-full object-contain py-2"
            />
            <Badge variant="outline" className="absolute top-1 right-1 z-50">
              ${product.price}
            </Badge>
            <CardHeader className="flex-1">
              <CardTitle className="line-clamp-2">{product.title}</CardTitle>
              <CardDescription className="line-clamp-3">{product.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">
                <FaCartPlus /> <p>Add to Cart</p>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
