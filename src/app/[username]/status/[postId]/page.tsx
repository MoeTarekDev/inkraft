import CaptionCard from "@/components/CaptionCard";
import WhoToFollow from "@/components/WhoToFollow";
import { getFollowedUsers, getFullPostData } from "@/lib/users";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
export async function generateMetadata({ params }: any) {
  const personalInfo: any = await currentUser();

  let bigPost: any;
  try {
    bigPost = await getFullPostData(params.postId, personalInfo.id);
  } catch (error) {
    console.log(error);

    notFound();
  }

  const name = `${bigPost.data.post.users.firstName} ${bigPost.data.post.users.lastName}`;
  return {
    title: `${name} on inkraft: "${bigPost.data.post.caption}"`,
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
  // if (!bigPost || bigPost.length === 0) notFound();

  return (
    <section className="grid grid-cols-12 w-full self-start h-full sm:pe-5 space-x-4 mt-[81px] sm:mt-0 ">
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
      <aside className="col-span-4 hidden lg:block p-5">
        <WhoToFollow loggedInUserFollowedUsers={loggedInUserFollowedUsers} />
      </aside>
    </section>
  );
}
