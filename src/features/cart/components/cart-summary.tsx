import { useState } from 'react';
import { FaTicketAlt } from 'react-icons/fa';

import { Button, MotionButton } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateDiscountCode } from '@/features/cart/validate-discount-code';
import { useCartStore } from '@/store/products.store';

export function CartSummary() {
  const [open, setOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountError, setDiscountError] = useState('');
  const appliedDiscount = useCartStore((state) => state.appliedDiscount);
  const setAppliedDiscount = useCartStore((state) => state.setAppliedDiscount);
  const cartItems = useCartStore((state) => state.cartItems);
  const subTotal = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  const vat = (Number(subTotal) * 0.08).toFixed(2);
  const discount = (appliedDiscount ? Number(subTotal) * (appliedDiscount / 100) : 0).toFixed(2);
  const total = (Number(subTotal) + Number(vat) - Number(discount)).toFixed(2);

  const handleApplyDiscount = () => {
    const percent = validateDiscountCode(discountCode.trim());
    if (percent === 0) {
      setDiscountError('Invalid discount code');
      return;
    }

    setAppliedDiscount(percent);
    setDiscountCode('');
    setDiscountError('');
    setOpen(false);
  };

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
          <Dialog
            open={open}
            onOpenChange={(o) => {
              setOpen(o);
              if (o) setDiscountError('');
            }}
          >
            <DialogTrigger asChild>
              <MotionButton
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'tween', duration: 0.1, ease: 'easeOut' }}
                variant="secondary"
                size="sm"
                data-testid="discount-code-button"
                className="cursor-pointer"
              >
                <FaTicketAlt /> Discount code
              </MotionButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Discount Code</DialogTitle>
                <DialogDescription>
                  Enter a discount code to get a better deal on your purchase!
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-2">
                <div className="grid flex-1 gap-2">
                  <Input
                    data-testid="discount-code-input"
                    id="discount-code"
                    aria-label="Discount code input"
                    placeholder="Enter your discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    aria-invalid={!!discountError}
                    aria-describedby={discountError ? 'discount-error' : undefined}
                  />
                  {discountError && (
                    <p id="discount-error" className="text-destructive mt-2 text-xs">
                      {discountError}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <Button type="button" onClick={handleApplyDiscount}>
                  Apply Discount Code
                </Button>
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
