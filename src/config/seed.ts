import { container } from './container';
import { Post, Product, Disease, Group, User, Comment } from '../models';

/**
 * Seed initial data for development and testing
 */
export async function seedDatabase(): Promise<void> {
  console.log('🌱 Seeding database...');

  try {
    // Check if data already exists
    const existingPosts = await container.postController.getAllPosts();
    if (existingPosts.length > 0) {
      console.log('✅ Database already seeded');
      return;
    }

    // Seed Users
    const users = [
      new User(
        '1',
        'Juan Pérez',
        'https://picsum.photos/seed/user1/200/200',
        'Valle del Cauca, Colombia',
        'Agricultor',
        'juan.perez@example.com',
        'password123',
        'Agricultor con 15 años de experiencia en cultivos de café'
      ),
      new User(
        '2',
        'María García',
        'https://picsum.photos/seed/user2/200/200',
        'Antioquia, Colombia',
        'Ingeniero',
        'maria.garcia@example.com',
        'password123',
        'Ingeniera agrónoma especializada en fertilización'
      ),
      new User(
        '3',
        'Carlos Rodríguez',
        'https://picsum.photos/seed/user3/200/200',
        'Cundinamarca, Colombia',
        'Proveedor',
        'carlos.rodriguez@example.com',
        'password123',
        'Proveedor de semillas certificadas y herramientas'
      ),
    ];

    for (const user of users) {
      await container.userController.createUser(user);
    }

    // Seed Posts
    const posts = [
      new Post(
        '1',
        '1',
        'Juan Pérez',
        'https://picsum.photos/seed/user1/200/200',
        '¡Excelente cosecha de café este año! 🌱☕ Las lluvias fueron perfectas y la calidad del grano es superior. #Café #Agricultura',
        15,
        3,
        ['Café', 'Agricultura'],
        'https://picsum.photos/seed/coffee1/800/600'
      ),
      new Post(
        '2',
        '2',
        'María García',
        'https://picsum.photos/seed/user2/200/200',
        'Nuevas técnicas de fertilización orgánica disponibles. ¿Alguien interesado en aprender más? 🌿',
        8,
        5,
        ['Fertilización', 'Orgánico']
      ),
      new Post(
        '3',
        '1',
        'Juan Pérez',
        'https://picsum.photos/seed/user1/200/200',
        'Identificamos roya en algunos cultivos. ¿Algún consejo? 🍃',
        12,
        7,
        ['Roya', 'Plagas', 'Ayuda']
      ),
    ];

    for (const post of posts) {
      await container.postController.createPost(post);
    }

    // Seed Products
    const products = [
      new Product(
        '1',
        'Semillas de Café Arábica',
        45000,
        'COP',
        'Semillas certificadas de café arábica, alta calidad',
        'Semillas',
        'https://picsum.photos/seed/seed1/400/400',
        '3',
        'Carlos Rodríguez',
        500
      ),
      new Product(
        '2',
        'Fertilizante Orgánico 25kg',
        85000,
        'COP',
        'Fertilizante 100% orgánico para todo tipo de cultivos',
        'Fertilizantes',
        'https://picsum.photos/seed/fertilizer1/400/400',
        '3',
        'Carlos Rodríguez',
        200
      ),
      new Product(
        '3',
        'Kit de Herramientas Agrícolas',
        125000,
        'COP',
        'Set completo de herramientas: pala, rastrillo, tijeras de podar',
        'Herramientas',
        'https://picsum.photos/seed/tools1/400/400',
        '3',
        'Carlos Rodríguez',
        50
      ),
    ];

    for (const product of products) {
      await container.productController.createProduct(product);
    }

    // Seed Diseases
    const diseases = [
      new Disease(
        '1',
        'Roya del Café',
        'Hemileia vastatrix',
        [
          'Manchas amarillas en hojas',
          'Polvo anaranjado en el envés',
          'Caída prematura de hojas',
        ],
        'Aplicar fungicidas específicos y mejorar ventilación del cultivo',
        ['Café'],
        'https://picsum.photos/seed/disease1/400/400',
        [
          'Mantener distancia adecuada entre plantas',
          'Eliminar hojas infectadas',
          'Usar variedades resistentes',
        ],
        'Alta'
      ),
      new Disease(
        '2',
        'Tizón Tardío',
        'Phytophthora infestans',
        [
          'Manchas oscuras en hojas y tallos',
          'Pudrición de frutos',
          'Moho blanco en condiciones húmedas',
        ],
        'Fungicidas preventivos y evitar riego por aspersión',
        ['Tomate', 'Papa'],
        'https://picsum.photos/seed/disease2/400/400',
        [
          'Rotación de cultivos',
          'Eliminar restos de plantas infectadas',
          'Mejorar drenaje del suelo',
        ],
        'Alta'
      ),
    ];

    for (const disease of diseases) {
      await container.diseaseController.createDisease(disease);
    }

    // Seed Groups
    const groups = [
      new Group(
        '1',
        'Caficultores de Colombia',
        'Grupo de agricultores dedicados al cultivo del café',
        'https://picsum.photos/seed/group1/400/400',
        234,
        true,
        new Date(),
        '1'
      ),
      new Group(
        '2',
        'Agricultura Orgánica',
        'Intercambio de experiencias en cultivos orgánicos',
        'https://picsum.photos/seed/group2/400/400',
        156,
        false,
        new Date(),
        '2'
      ),
      new Group(
        '3',
        'Control de Plagas Natural',
        'Métodos naturales para el control de plagas',
        'https://picsum.photos/seed/group3/400/400',
        89,
        true,
        new Date(),
        '2'
      ),
    ];

    for (const group of groups) {
      await container.groupController.createGroup(group);
    }

    // Seed Comments
    const comments = [
      new Comment(
        '1',
        '1',
        '2',
        'María García',
        'https://picsum.photos/seed/user2/200/200',
        '¡Felicitaciones! ¿Qué variedad de café cultivaste?'
      ),
      new Comment(
        '2',
        '1',
        '3',
        'Carlos Rodríguez',
        'https://picsum.photos/seed/user3/200/200',
        'Excelente cosecha. Si necesitas ayuda con el procesamiento, contáctame.'
      ),
      new Comment(
        '3',
        '3',
        '2',
        'María García',
        'https://picsum.photos/seed/user2/200/200',
        'La roya es complicada. Te recomiendo aplicar fungicidas a base de cobre y mejorar la ventilación.'
      ),
    ];

    for (const comment of comments) {
      await container.commentController.createComment({
        postId: comment.postId,
        userId: comment.userId,
        author: comment.author,
        authorAvatar: comment.authorAvatar,
        content: comment.content,
      });
    }

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
