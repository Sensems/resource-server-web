import { type } from "os";

export namespace API {
  interface DefaultBody<T> {
    data: T;
    msg: string;
  }

  namespace Playload {
    interface Resources {
      page: number;
      limit: number;
      search: search;
      dir?: string;
    }
    interface Upload {
      file: File;
    }
    interface DeleteFile {
      files: string;
    }
    interface RenameFolder {
      old_name: string;
      new_name: string;
    }
    interface CreateFolder {
      name: string;
    }
    interface DeleteFolder {
      name: string;
    }
    interface RenameFile {
      old_name: string;
      new_name: string;
    }
    interface moveFile {
      files: string;
      dest_dir: string;
    }

    interface Login {
      username: string;
      password: string;
    }

    interface DeleteUser {
      username: string;
    }

    interface AddUser {
      username: string;
      password: string;
      role: string;
    }
  }

  namespace Response {
    interface ItemDetail {
      name: string;
      path: string;
      type: 'file' | 'folder';
      modified_at: string;
      children?: ItemDetail[];
      extname: string;
      url: string;
      basename: string;
    }

    interface Resources {
      items: ItemDetail[];
      currentPage: number;
      totalPages: number;
      totalItems: number;
    }

    interface SystemInfo {
      host: string;
      rootFolder: string;
    }

    interface UserInfo {
      username: string;
      password: string;
      role: string;
    }

    type UserList = UserInfo[];
  }
}

