import { getAuthSession } from "./auth"
import { prisma } from "./db";

const DAY_IN_MS= 1000 * 60 * 60 * 24;

export const checkSubscription=async()=>{
    const session=await getAuthSession()
    if(!session?.user){
        return false;
    }

    const usersubscription=await prisma.userSubscription.findUnique({
        where:{
            userId:session.user.id,
        }

    })
    if(!usersubscription){
        return false;
    }

     const isValid =
    usersubscription.stripePriceId &&
    usersubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
}