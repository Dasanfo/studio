import { LiveTestClient } from "@/components/live-test-client";
import { getTestImages } from "@/lib/data";

export const metadata = {
    title: 'Live Test',
};

export default async function LiveTestPage() {
    const testImages = await getTestImages();
    return <LiveTestClient testImages={testImages} />;
}
