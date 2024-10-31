import CaptionCard from "@/components/CaptionCard";
import ShowWhoToFollowLayout from "@/components/ShowWhoToFollowLayout";
import { getFollowedUsers, getFullPostData, postMetaData } from "@/lib/users";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
export async function generateMetadata({ params }: any) {
  let data: any;
  try {
    data = await postMetaData(params.postId);
  } catch (error) {
    console.log(error);
    notFound();
  }
  const name = `${data.users.firstName} ${data.users.lastName}`;
  return {
    title: `${name} on inkraft: "${data.caption}"`,
    default: "profile",
  };
}
export default async function page({ params }: any) {
  const personalInfo: any = await currentUser();
  const loggedInUserFollowedUsers: any = await getFollowedUsers(
    personalInfo?.id
  );
  const postId = params.postId;
  let bigPost: any;
  try {
    bigPost = await getFullPostData(postId, personalInfo.id);
  } catch (error) {
    console.log(error);
    notFound();
  }

  return (
    <ShowWhoToFollowLayout showWhoToFollow={true} className={"mt-[81px]"}>
      <div className="col-span-full lg:col-span-8 flex flex-col sm:gap-2 items-center border-r">
        <CaptionCard
          userImage={null}
          personalInfo={personalInfo}
          bigPost={bigPost?.data}
          userId={personalInfo?.id}
          post={bigPost?.data?.post}
          rounded={false}
          singlePostMode={true}
          loggedInUserFollowedUsers={loggedInUserFollowedUsers}
        />
      </div>
    </ShowWhoToFollowLayout>
  );
}
