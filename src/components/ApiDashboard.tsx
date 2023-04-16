import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { formatDistance } from "date-fns";
import LgHeading from "./ui/LgHeading";
import Paragraph from "./ui/Paragraph";
import { Input } from "./ui/Input";
import Table from "./ui/Table";
import ApiKeyOptions from "./ApiKeyOptions";
const ApiDashboard = async () => {
  const user = await getServerSession(authOptions);
  if (!user) notFound();

  const apiKeys = await db.apiKey.findMany({
    where: { userId: user.user.id },
  });

  const activatedApiKey = apiKeys.find((apiKey) => apiKey.enabled);

  if (!activatedApiKey) notFound();
  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map((key) => key.id),
      },
    },
  });

  const serializabelRequests = userRequests.map((req) => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date()),
  }));
  return (
    <div className="container flex flex-col gap-6">
      <LgHeading>Welcome back, {user.user.name}</LgHeading>
      <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
        <Paragraph>Your APi key :</Paragraph>
        <Input
          className="w-fit truncate"
          readOnly
          value={activatedApiKey.key}
        />
        {/* add options to create / */}
        <ApiKeyOptions
          apiKeyId={activatedApiKey.id}
          apiKeyCopy={activatedApiKey.key}
        />
      </div>
      <Paragraph className="text-center md:text-left mt-4 -mb-4">
        Your APi history :
      </Paragraph>
      <Table userRequests={serializabelRequests} />
    </div>
  );
};

export default ApiDashboard;
