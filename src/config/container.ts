import { UserController } from '../controllers/UserController';
import { PostController } from '../controllers/PostController';
import { ProductController } from '../controllers/ProductController';
import { DiseaseController } from '../controllers/DiseaseController';
import { GroupController } from '../controllers/GroupController';
import { DiagnosisController } from '../controllers/DiagnosisController';
import { CommentController } from '../controllers/CommentController';

import { UserRepository } from '../repositories/UserRepository';
import { PostRepository } from '../repositories/PostRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { DiseaseRepository } from '../repositories/DiseaseRepository';
import { GroupRepository } from '../repositories/GroupRepository';
import { CommentRepository } from '../repositories/CommentRepository';

import { dbManager } from '../database/DatabaseManager';

/**
 * Dependency Injection Container
 * Centralized container for managing application dependencies
 * This allows easy swapping of implementations (e.g., switching from IndexedDB to API)
 */
class Container {
  private static instance: Container;
  
  // Controllers
  private _userController?: UserController;
  private _postController?: PostController;
  private _productController?: ProductController;
  private _diseaseController?: DiseaseController;
  private _groupController?: GroupController;
  private _diagnosisController?: DiagnosisController;
  private _commentController?: CommentController;

  // Repositories
  private _userRepository?: UserRepository;
  private _postRepository?: PostRepository;
  private _productRepository?: ProductRepository;
  private _diseaseRepository?: DiseaseRepository;
  private _groupRepository?: GroupRepository;
  private _commentRepository?: CommentRepository;

  private initialized = false;

  private constructor() {}

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  /**
   * Initialize the database and all dependencies
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    // Initialize database
    await dbManager.initialize();
    
    // Initialize repositories
    this._userRepository = new UserRepository();
    this._postRepository = new PostRepository();
    this._productRepository = new ProductRepository();
    this._diseaseRepository = new DiseaseRepository();
    this._groupRepository = new GroupRepository();
    this._commentRepository = new CommentRepository();

    // Initialize controllers with their dependencies
    this._userController = new UserController(this._userRepository);
    this._postController = new PostController(this._postRepository);
    this._productController = new ProductController(this._productRepository);
    this._diseaseController = new DiseaseController(this._diseaseRepository);
    this._groupController = new GroupController(this._groupRepository);
    this._diagnosisController = new DiagnosisController();
    this._commentController = new CommentController(this._commentRepository, this._postRepository);

    this.initialized = true;
  }

  // Controller getters
  get userController(): UserController {
    if (!this._userController) {
      throw new Error('Container not initialized. Call initialize() first.');
    }
    return this._userController;
  }

  get postController(): PostController {
    if (!this._postController) {
      throw new Error('Container not initialized. Call initialize() first.');
    }
    return this._postController;
  }

  get productController(): ProductController {
    if (!this._productController) {
      throw new Error('Container not initialized. Call initialize() first.');
    }
    return this._productController;
  }

  get diseaseController(): DiseaseController {
    if (!this._diseaseController) {
      throw new Error('Container not initialized. Call initialize() first.');
    }
    return this._diseaseController;
  }

  get groupController(): GroupController {
    if (!this._groupController) {
      throw new Error('Container not initialized. Call initialize() first.');
    }
    return this._groupController;
  }

  get diagnosisController(): DiagnosisController {
    if (!this._diagnosisController) {
      throw new Error('Container not initialized. Call initialize() first.');
    }
    return this._diagnosisController;
  }

  get commentController(): CommentController {
    if (!this._commentController) {
      throw new Error('Container not initialized. Call initialize() first.');
    }
    return this._commentController;
  }

  /**
   * Get database instance
   */
  async getDatabase(): Promise<IDBDatabase> {
    return dbManager.getDatabase();
  }

  /**
   * Reset the container (useful for testing or switching implementations)
   */
  reset(): void {
    this._userController = undefined;
    this._postController = undefined;
    this._productController = undefined;
    this._diseaseController = undefined;
    this._groupController = undefined;
    this._diagnosisController = undefined;
    this._commentController = undefined;

    this._userRepository = undefined;
    this._postRepository = undefined;
    this._productRepository = undefined;
    this._diseaseRepository = undefined;
    this._groupRepository = undefined;
    this._commentRepository = undefined;

    this.initialized = false;
  }
}

export const container = Container.getInstance();
