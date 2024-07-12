import { Client, isFullPage } from "@notionhq/client";
import {
  PageObjectResponse
} from "@notionhq/client/build/src/api-endpoints";

export function getPageTitle(page: PageObjectResponse): string {
  const title = page.properties.Name ?? page.properties.title;
  if (title.type === "title") {
    return title.title.map((text) => text.plain_text).join("");
  }
  throw Error(
    `page.properties.Name has type ${title.type} instead of title. The underlying Notion API might has changed, please report an issue to the author.`
  );
}

export function getPagePublishDate(page: PageObjectResponse): string {
  const publishDate = page.properties["Publish Date"] ?? page.created_time;
  if (publishDate.type === "date" && publishDate.date) {
    return publishDate.date.start;
  }
  throw Error(
    `page.properties.PublishDate has type ${publishDate.type} instead of date or is null. The underlying Notion API might have changed, please report an issue to the author.`
  );
}

export function getPageShouldBeProcessed(page: PageObjectResponse): boolean {
  const statusProperty = page.properties.Status;

  // Check if the statusProperty is of the expected type
  if (statusProperty.type === "status" && statusProperty.status) {
    const statusName = statusProperty.status.name;
    if (statusName !== "Published" && statusName !== "Draft") {
      console.info(
        `[Info] The post ${statusName} is not ready to be published, skipped.`
      );
      return false;
    }
    return true;
  }

  // If the statusProperty is not of the expected type, handle the error
  throw Error(
    `page.properties.Status has type ${statusProperty.type} instead of status. The underlying Notion API might have changed, please report an issue to the author.`
  );
}

export async function getCoverLink(
  page_id: string,
  notion: Client
): Promise<{link: string, expiry_time: string | null} | null> {
  const page = await notion.pages.retrieve({ page_id });
  if (!isFullPage(page)) return null;
  if (page.cover === null) return null;
  if (page.cover.type === "external") return {
    link: page.cover.external.url,
    expiry_time: null
  };
  else return {
    link: page.cover.file.url,
    expiry_time: page.cover.file.expiry_time
  };
}

export function getFileName(title: string, page_id: string): string {
  return title.replaceAll(" ", "-").replace(/--+/g, "-") +
  "-" +
  page_id.replaceAll("-", "") + '.md';
}