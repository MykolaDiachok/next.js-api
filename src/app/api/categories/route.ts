import {prisma} from "@/lib/prisma";
import {Prisma} from "@prisma/client";
import {NextRequest} from "next/server";

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: Success
 */
export async function GET() {
    try {
        const categories = await prisma.category.findMany();

        return new Response(JSON.stringify(categories), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        await prisma.$disconnect();
    }
}

export type CategoryCreateInput = Prisma.CategoryCreateInput;

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Books"
 *     responses:
 *       201:
 *         description: Category successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
export async function POST(request: NextRequest) {
    try {
        const body: CategoryCreateInput = await request.json();

        if (!body.name) {
            return new Response(JSON.stringify({ error: 'Name is required' }), { status: 400 });
        }

        const created = await prisma.category.create({
            data: body,
        });

        return new Response(JSON.stringify(created), { status: 201 });
    } catch (error) {
        console.error('Error creating category:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}