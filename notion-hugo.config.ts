import { UserConfig } from "./src/config"

const userConfig: UserConfig = {
    mount: {
        manual: false,
        page_url: 'https://www.notion.so/Hugo-252a519e13ee46c5b576691e1026e7e0',
        // page_url: 'https://pcloud.notion.site/Notion-DoIt-04bcc51cfe4c49938229c35e4f0a6fb6',
        pages: [
            // {
            //     page_id: '<page_id>',
            //     target_folder: 'path/relative/to/content/folder'
            // }

            // Get Page ID from URL
            // https://www.notion.so/About-42464b089a234424a6396c013fa6cef6
            // https://www.notion.so/<page_name>-<page_id>
            // <page_id> is the page ID.
            {
                // About Page
                page_id: '45eb121158b9489480ec000fd25c812b',
                target_folder: '.'
            }
        ],
        databases: [
            // {
            //     database_id: '<database_id>',
            //     target_folder: 'path/relative/to/content/folder'
            // }

            // Get Database ID from URL
            // https://www.notion.so/4bb8f075358d4efeb575192baa1d62b9?v=3f363ced63f04f54977e2c0c84b482ee
            // https://www.notion.so/<long_hash_1>?v=<long_hash_2>
            // <long_hash_1> is the database ID and <long_hash_2> is the view ID.
            {
                // Notion 'Posts' Database
                database_id: '4bb8f075358d4efeb575192baa1d62b9',
                target_folder: '.'
            }
        ],
    }
}

export default userConfig;
