import type { Metadata } from "next";
import WebNotFound from "./(web)/not-found";

export const metadata: Metadata = { title: "Page Not Found" };

// Addresses that match no route land here, outside the site layout: show the branded 404 page
export default WebNotFound;
