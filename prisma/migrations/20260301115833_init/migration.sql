-- CreateEnum
CREATE TYPE "RequirementType" AS ENUM ('MIN_YEARS_IN_RANK', 'MIN_YEARS_TOTAL_SERVICE', 'REQUIRED_COURSE', 'REQUIRED_PREVIOUS_RANK');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "oid" TEXT NOT NULL,
    "mpid" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "rankId" UUID,
    "addressId" UUID,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "addressId" UUID,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "street" TEXT NOT NULL,
    "houseNumber" INTEGER NOT NULL,
    "zipCode" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "passed" BOOLEAN NOT NULL DEFAULT true,
    "locationId" UUID NOT NULL,
    "courseId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "participations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ranks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "ranks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "rankId" UUID NOT NULL,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotion_requirements" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "rankId" UUID NOT NULL,
    "type" "RequirementType" NOT NULL,
    "minYears" INTEGER,
    "requiredRankId" UUID,
    "requiredCourseId" UUID,
    "groupKey" TEXT,

    CONSTRAINT "promotion_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_oid_key" ON "users"("oid");

-- CreateIndex
CREATE UNIQUE INDEX "users_mpid_key" ON "users"("mpid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ranks_level_key" ON "ranks"("level");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "ranks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participations" ADD CONSTRAINT "participations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participations" ADD CONSTRAINT "participations_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participations" ADD CONSTRAINT "participations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "ranks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_requirements" ADD CONSTRAINT "promotion_requirements_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "ranks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_requirements" ADD CONSTRAINT "promotion_requirements_requiredRankId_fkey" FOREIGN KEY ("requiredRankId") REFERENCES "ranks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_requirements" ADD CONSTRAINT "promotion_requirements_requiredCourseId_fkey" FOREIGN KEY ("requiredCourseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
