"use client"
import React from 'react'
import Header from "@/components/shared/Header"
import TransformationForm from "@/components/shared/TransformationForm"

import { transformationTypes } from "@/constants/index"
import { useParams } from 'next/navigation'

const AddTransformationType = () => {
    const params = useParams<{ type: string }>()
    const type = params.type as TransformationTypeKey

    const transformation = transformationTypes[type]

    return (
        <>
            <Header title={transformation.title} subTitle={transformation.subTitle} />
            <TransformationForm />
        </>
    )
}

export default AddTransformationType