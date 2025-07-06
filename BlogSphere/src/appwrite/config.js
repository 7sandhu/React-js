import conf from "../conf/conf";
import {Client, ID, Databases, Storage, Query} from "appwrite";


export class Service{

    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({content, featuredImage, title, userId, status, slug, username}){
        try {
            const result = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    status,
                    featuredImage,
                    content,
                    userId,
                    username
                }
            );
            
            return result;
        } catch (error) {
            throw error;
        }
    }


    async updatePost(slug, {content, featuredImage, title, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    content,
                    featuredImage,
                    status,
                    title
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
            
            return result;
        } catch (error) {
            return false;
        }
    }

    async getPostsByUser(userId) {
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("userId", userId),
                    Query.equal("status", "active"),
                    Query.orderDesc("$createdAt")
                ]
            );
            return result.documents;
        } catch (error) {
            return [];
        }
    }

    async uploadFile(file){
        try {
            const result = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            return false;
        }
    }


    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId

        )
    }

    getFileView(fileId) {
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        );
    }

}


const service = new Service();

export default service;