import { Link } from '@tanstack/react-router';
import { ArrowRight, Minus, Plus, Trash } from 'lucide-react';
import { motion, stagger, type Variants } from 'motion/react';
import { useState } from 'react';

import { Button, MotionButton } from '@/components/ui/button';
import { useCartStore } from '@/store/products.store';

export function CartItems() {
  const cartItems = useCartStore((state) => state.cartItems);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

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

  if (cartItems.length === 0)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <p>Your cart is empty.</p>
        <Link to="/">
          <MotionButton
            className="hover:cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'tween', duration: 0.1, ease: 'easeOut' }}
          >
            <ArrowRight /> Continue Shopping
          </MotionButton>
        </Link>
      </div>
    );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="my-4 flex flex-col gap-4"
    >
      {cartItems.map((item) => (
        <motion.div
          key={item.id}
          variants={itemVariants}
          className="full-shadow flex gap-4 rounded-md p-4"
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <img
            src={item.image}
            alt={item.title}
            className="full-shadow aspect-video h-28 w-28 rounded-sm bg-black/35 object-contain py-2"
          />
          <div className="flex w-full flex-col">
            <div className="">
              <h3 className="line-clamp-1 font-medium">{item.title}</h3>
              <p className="text-muted-foreground line-clamp-2 text-sm">{item.description}</p>
              <p className="text-muted-foreground text-sm">Price: ${item.price}</p>
            </div>
            <div className="mt-auto ml-auto flex gap-2 pt-2">
              {hoveredItem === item.id && (
                <MotionButton
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'tween', duration: 0.1, ease: 'easeOut' }}
                  variant="destructive"
                  size="icon-xs"
                  aria-label="remove item"
                  className="m-0 hover:cursor-pointer"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash />
                </MotionButton>
              )}
              <div className="full-shadow flex items-center justify-between gap-2 rounded-lg">
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="minus item"
                  className="hover:cursor-pointer"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  <Minus />
                </Button>
                <p className="text-xs">{item.quantity}</p>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="plus item"
                  className="hover:cursor-pointer"
                  onClick={() => increaseQuantity(item.id)}
                >
                  <Plus />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
