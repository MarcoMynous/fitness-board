import { EntitlementType } from './products';

export interface UserEntitlement {
  id: string;
  userId: string;
  accessType: EntitlementType;
  status: 'active' | 'revoked' | 'refunded' | 'expired';
  startsAt: Date | string;
  endsAt?: Date | string | null;
  revokedAt?: Date | string | null;
}

export function isEntitlementActive(entitlement: UserEntitlement): boolean {
  if (entitlement.status !== 'active') return false;
  if (entitlement.revokedAt) return false;

  const now = new Date().getTime();
  const start = new Date(entitlement.startsAt).getTime();
  if (start > now) return false;

  if (entitlement.endsAt) {
    const end = new Date(entitlement.endsAt).getTime();
    if (end < now) return false;
  }

  return true;
}

export function hasTrainingAccess(entitlements: UserEntitlement[]): boolean {
  return entitlements.some(e => e.accessType === 'training' && isEntitlementActive(e));
}

export function hasCookbookAccess(entitlements: UserEntitlement[]): boolean {
  return entitlements.some(e => e.accessType === 'cookbook' && isEntitlementActive(e));
}

export function checkAccess(
  entitlements: UserEntitlement[],
  required: EntitlementType
): { hasAccess: boolean; missingProduct: 'training' | 'cookbook' | null } {
  const hasAccess = required === 'training' ? hasTrainingAccess(entitlements) : hasCookbookAccess(entitlements);
  return {
    hasAccess,
    missingProduct: hasAccess ? null : required
  };
}
