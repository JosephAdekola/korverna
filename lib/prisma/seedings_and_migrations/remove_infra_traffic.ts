import { prisma } from "../prisma";

try {
    await prisma.infraPageTraffic.deleteMany({
    where: {
        utmCampaign: null
    }
});

console.log("successful!");

} catch (error) {
    console.log("unsuccessful: ", error);
    
}