import NavBar from '@/components/navigation/NavBar';
import { SubscriptionEntitlementQuery } from '@/convex/query.config';
import { combinedSlug } from '@/lib/utils';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    children: React.ReactNode;
}

const SessionLayout = async ({ children }: Props) => {

    // const { entitlement, profileName } = await SubscriptionEntitlementQuery();
    // if (!entitlement._valueJSON) {
    //     // redirect(`/billing/${combinedSlug(profileName!)}`)
    //     redirect(`/dashboard/${combinedSlug(profileName!)}`)
    // }

    return (
        <div>
            <NavBar />
            {children}
        </div>
    )
}

export default SessionLayout