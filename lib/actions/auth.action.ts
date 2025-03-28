'use server'

export async function signUp(params: SignInParams) {
    const { uid, name, email} = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();
        if (userRecord.exists) {
            return {
                success: false,
                message: 'User already exists, please sign in instead',
            }
        }

        await db.collection('users').doc(uid).set({
            name, email
            // name: name,
            // email: email,
        })
    } catch (e: any) {
        console.error('Error creating a user', e);

        if(e.code === 'auth/email-already-exists') {
            return{
                success: false,
                message: 'This email is already in use.',
            }
        }

        return {
            success: false,
            message: 'Failed to create an account',
        }
    }
}