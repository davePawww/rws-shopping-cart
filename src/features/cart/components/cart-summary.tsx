import { FaTicketAlt } from 'react-icons/fa';

import { Button, MotionButton } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCartStore } from '@/store/products.store';

export function CartSummary() {
  const cartItems = useCartStore((state) => state.cartItems);
  const subTotal = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  const vat = (Number(subTotal) * 0.08).toFixed(2);
  const discount = (Number(subTotal) > 100 ? Number(subTotal) * 0.1 : 0).toFixed(2);
  const total = (Number(subTotal) + Number(vat) - Number(discount)).toFixed(2);

  if (cartItems.length === 0) return null;

  return (
    <div className="mt-auto w-full space-y-2">
      <h4 className="font-medium">Cart Summary</h4>

      <div className="full-shadow mb-4 flex flex-col rounded-md p-4">
        <div className="flex-1 space-y-1">
          <div className="grid grid-cols-[max-content_auto] justify-end gap-x-16 gap-y-1 md:justify-start">
            <Label className="text-muted-foreground">Subtotal: </Label>
            <p className="text-muted-foreground text-xs font-medium">${subTotal}</p>
            <Label className="text-muted-foreground">VAT: </Label>
            <p className="text-muted-foreground text-xs font-medium">${vat}</p>
            <Label className="text-muted-foreground">Discount: </Label>
            <p className="text-muted-foreground text-xs font-medium">-${discount}</p>
            <Label>Total: </Label>
            <p className="text-xs font-medium">${total}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-1 items-center justify-end gap-1">
          <Dialog>
            <DialogTrigger asChild>
              <MotionButton
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'tween', duration: 0.1, ease: 'easeOut' }}
                variant="secondary"
                size="sm"
                className="cursor-pointer"
              >
                <FaTicketAlt /> Discount code
              </MotionButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to view this.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue="https://ui.shadcn.com/docs/installation"
                    readOnly
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <MotionButton
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'tween', duration: 0.1, ease: 'easeOut' }}
            size="sm"
            className="cursor-pointer"
          >
            Proceed to Checkout
          </MotionButton>
        </div>
      </div>
    </div>
  );
}
